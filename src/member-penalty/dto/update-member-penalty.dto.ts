import { PartialType } from '@nestjs/swagger';
import { CreateMemberPenaltyDto } from './create-member-penalty.dto';

export class UpdateMemberPenaltyDto extends PartialType(CreateMemberPenaltyDto) {}
