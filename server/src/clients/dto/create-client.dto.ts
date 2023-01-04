import { IsString, IsNotEmpty, IsPhoneNumber, IsNumber, IsOptional } from 'class-validator';
export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsPhoneNumber('IT')
  cellphone: string;
  
  @IsOptional()
  @IsString()
  note: string;
}
