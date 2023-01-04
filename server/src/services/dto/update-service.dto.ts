import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsDecimal } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsDecimal({decimal_digits: '2,2'})
  @IsNotEmpty()
  price: number

  @IsString()

  note: string

  @IsNumber()
  duration: number

  @IsString()
  type: string
}
