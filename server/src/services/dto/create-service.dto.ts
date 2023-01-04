import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsDecimal({ decimal_digits: '2,2' })
  @IsOptional()
  price: number

  @IsString()
  @IsOptional()
  note: string

  @IsNumber()
  @IsOptional()
  duration: number

  @IsString()
  @IsOptional()
  type: string
}
