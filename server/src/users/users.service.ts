import {Injectable} from '@nestjs/common'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Users} from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }

  findAll() {
    return this.usersRepository.find()
  }

  findOne(id: number) {
    return this.usersRepository.findOne({where: {id}})
  }
  findOneByEmail(email: string) {
    return this.usersRepository.findOne({where: {email}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.usersRepository.delete(id)
  }
}
