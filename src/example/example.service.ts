import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UseException } from 'src/utils';
import { ResCode } from 'src/common/response/code.response';
import UseResponse from 'src/common/response/use.response';

@Injectable()
export class ExampleService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateExampleDto) {
    try {
      const data = await this.prisma.example.create({
        data: dto
      })

      return UseResponse(ResCode.Created, data)
    } catch (error) {
      throw new UseException(error)
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.example.findMany();

      return UseResponse(ResCode.Get, data)
    } catch (error) {
      throw new UseException(error)
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.example.findUnique({
        where: {
          id
        }
      })

      return UseResponse(ResCode.Get, data)
    } catch (error) {
      throw new UseException(error)
    }
  }

  async update(id: string, dto: UpdateExampleDto) {
    try {
      const data = await this.prisma.example.update({
        where: {
          id
        },
        data: dto
      })

      return UseResponse(ResCode.Updated, data)
    } catch (error) {
      throw new UseException(error)
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.example.delete({
        where: {
          id
        }
      })

      return UseResponse(ResCode.Deleted, data)
    } catch (error) {
      throw new UseException(error)
    }
  }
}
