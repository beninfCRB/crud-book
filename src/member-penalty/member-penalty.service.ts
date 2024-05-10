import { Injectable } from '@nestjs/common';
import { CreateMemberPenaltyDto } from './dto/create-member-penalty.dto';
import { UpdateMemberPenaltyDto } from './dto/update-member-penalty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberPenalty } from './entities/member-penalty.entity';
import { Repository } from 'typeorm';
import ResponseData from 'src/utils/response.utils';
import { UseResponse } from 'src/statics/response.statics';
import { UseException } from 'src/utils';
import { ParamsMemberPenaltyDto } from './dto/params-member-penalty.dto';

@Injectable()
export class MemberPenaltyService {
  constructor(
    @InjectRepository(MemberPenalty) private repo: Repository<MemberPenalty>
  ) { }

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

  async findOneByMember(id: string) {
    try {
      const data = await this.repo.findOne({
        where: {
          memberId: id
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
}
