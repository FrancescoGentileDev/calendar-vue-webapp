import {IsString, IsEmail, Length, IsNotEmpty} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  lastname: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @Length(8, 20)
  @IsNotEmpty()
  password: string
}
