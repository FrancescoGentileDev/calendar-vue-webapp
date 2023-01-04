import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional, Length, isPhoneNumber, IsNumber } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
  
  @IsPhoneNumber('IT')
  cellphone: string;


  @IsString()
  note: string;

}
