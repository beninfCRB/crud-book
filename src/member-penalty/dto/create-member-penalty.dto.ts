import { IsDateString, IsString } from "class-validator"

export class CreateMemberPenaltyDto {
    @IsString()
    memberId: string

    @IsDateString()
    startDate: Date
}
