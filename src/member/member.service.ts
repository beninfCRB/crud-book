import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UseResponse } from 'src/statics/response.statics';
import { UseException } from 'src/utils/exception.utils';
import ResponseData from 'src/utils/response.utils';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private repo: Repository<Member>
  ) { }

  async create(dto: CreateMemberDto) {
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
      const data = await this.repo.find()

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

  async update(id: string, dto: UpdateMemberDto) {
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
