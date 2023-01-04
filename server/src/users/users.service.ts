import {Injectable, BadRequestException} from '@nestjs/common'
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
 async create(createUserDto: CreateUserDto) {
    if (await this.findOneByEmail(createUserDto.email)) {
      throw new BadRequestException('Email already exists')
    }
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (await this.findOneByEmail(updateUserDto.email)) {
      throw new BadRequestException('Email already exists')
    }
    return this.usersRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.usersRepository.delete(id)
  }
}
