import { Transform } from "class-transformer"
import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsDecimal({ decimal_digits: "2,2" })
  price: number

  @IsOptional()
  @IsString()
  note: string

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsInt()
  @IsPositive()
  duration: number

  @IsOptional()
  @IsString()
  type: string
}
