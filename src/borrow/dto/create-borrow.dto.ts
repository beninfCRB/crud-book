import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateBorrowDto {
    @IsString()
    @IsNotEmpty()
    memberId: string

    @IsString()
    @IsNotEmpty()
    bookId: string

    @IsDateString()
    @IsOptional()
    borrowDate?: Date

    @IsDateString()
    @IsOptional()
    returnDate?: Date

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsString()
    @IsOptional()
    description?: string
}
