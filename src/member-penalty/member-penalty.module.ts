import { Module } from '@nestjs/common';
import { MemberPenaltyService } from './member-penalty.service';
import { MemberPenaltyController } from './member-penalty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberPenalty } from './entities/member-penalty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberPenalty])],
  controllers: [MemberPenaltyController],
  providers: [MemberPenaltyService],
})
export class MemberPenaltyModule { }
