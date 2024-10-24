import { IsNotEmpty, IsString } from "class-validator";

export class CreateExampleDto {
  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsString()
  name: string
}
