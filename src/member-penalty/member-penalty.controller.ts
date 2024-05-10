import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MemberPenaltyService } from './member-penalty.service';
import { CreateMemberPenaltyDto } from './dto/create-member-penalty.dto';
import { UpdateMemberPenaltyDto } from './dto/update-member-penalty.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParamsMemberPenaltyDto } from './dto/params-member-penalty.dto';

@ApiTags('member-penalty')
@Controller('member-penalty')
export class MemberPenaltyController {
  constructor(private readonly memberPenaltyService: MemberPenaltyService) { }

  @Get()
  findAll() {
    return this.memberPenaltyService.findAll();
  }

  @Get(':id')
  findOneByMember(@Param('id') id: string) {
    return this.memberPenaltyService.findOneByMember(id);
  }
}
