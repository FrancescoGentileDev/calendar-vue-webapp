import {IsString, IsEmail, Length, IsNotEmpty} from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @Length(8, 20)
  @IsNotEmpty()
  password: string
}
