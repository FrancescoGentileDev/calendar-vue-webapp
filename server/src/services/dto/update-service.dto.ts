import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsDecimal } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { IsPositive } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {

  name: string

  price: number

  note: string

  duration: number

  type: string
}
