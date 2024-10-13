import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UseResponse } from 'src/statics/response.statics';
import { UseException } from 'src/utils';
import ResponseData from 'src/utils/response.utils';
import { Not } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    private prisma:PrismaService
  ) { }

  async create(dto: CreateBookDto) {
    try {
      const data = await this.prisma.book.create({
        data:dto
      })

      return ResponseData(data, UseResponse.Success.Insert)
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.book.findMany({
        where: {
          NOT:{
            stock:0
          }
        }
      })

      return ResponseData(data, UseResponse.Success.Get)
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.book.findUnique({
        where: {
          id
        }
      })

      return ResponseData(data, UseResponse.Success.Get)
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }

  async update(id: string, dto: UpdateBookDto) {
    try {
      const data = await this.prisma.book.update({
        where:{
          id
        },
        data:dto
      })


      return ResponseData(data, UseResponse.Success.Update)
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.book.delete({
        where:{
          id
        }
      })

      return ResponseData(null, UseResponse.Success.Delete)
    } catch (error) {
      if (error?.errno) {
        throw new UseException({
          message: UseResponse.Error.Insert,
          message_sql: error?.sqlMessage
        })
      } else {
        throw new UseException(error)
      }
    }
  }
}
