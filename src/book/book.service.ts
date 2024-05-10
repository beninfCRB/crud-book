import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UseResponse } from 'src/statics/response.statics';
import { UseException } from 'src/utils';
import ResponseData from 'src/utils/response.utils';
import { Not, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private repo: Repository<Book>
  ) { }

  async create(dto: CreateBookDto) {
    try {
      const obj = await this.repo.create({
        ...dto
      })

      const data = await this.repo.save(obj)

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
      const data = await this.repo.find({
        where: {
          stock: Not(0)
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
      const data = await this.repo.findOne({
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
      await this.repo.update(id, {
        ...dto
      })

      const data = await this.repo.findOne({
        where: {
          id
        }
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
      await this.repo.softDelete(id)

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
