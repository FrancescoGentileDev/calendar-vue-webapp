import {Injectable} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import { CreateUserDto } from './../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    if (user && await bcrypt.compare(pass, user.password) ) {
      const {password, is_admin, ...result} = user
      return result
    }
    return null
  }

  async registerUser(user: CreateUserDto) {
    const pass = user.password;
    user.password = await bcrypt.hash(pass, 10);
    return await this.usersService.create(user)
  }
}
