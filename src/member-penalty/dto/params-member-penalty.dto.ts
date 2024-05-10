import { IsString } from "class-validator";

export class ParamsMemberPenaltyDto {
    @IsString()
    memberId: string
}
