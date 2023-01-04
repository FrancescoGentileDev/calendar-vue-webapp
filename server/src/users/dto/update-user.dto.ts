import {PartialType} from '@nestjs/mapped-types'
import {IsEmail, IsString, Length} from 'class-validator'
import {CreateUserDto} from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string
  @IsString()
  lastname: string
  @IsEmail()
  email: string

  @IsString()
  @Length(8, 20)
  password: string
}
