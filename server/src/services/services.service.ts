import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Services } from 'src/services/entities/service.entity';
import { Repository } from 'typeorm';
import { UsersService } from './../users/users.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
    private readonly UsersService: UsersService,
  ) { }

  async create(services: object, id: any) {
    let {password, ...user} = await this.UsersService.findOne(id)
    let service = this.servicesRepository.create({
      ...services,
      user,

    })
    return this.servicesRepository.save(service)
  }

  async getServicesByUser(id: any) {
   return await this.servicesRepository.find({where: {user: {id}}})
  }

  findOneWithUser(id: number) {
    return this.servicesRepository.findOne({ where: { id }, relations: ['user'] })
  }

  findOne(id: number) {
    return this.servicesRepository.findOne({ where: { id } })
  }

   update(id: number, updateServiceDto: UpdateServiceDto) {
    console.log(updateServiceDto)
    if (!Object.keys(updateServiceDto).length) throw new BadRequestException('Empty body');
    this.servicesRepository.update(id, updateServiceDto)
    return this.findOne(id)
  }

  remove(id: number) {
    return this.servicesRepository.delete(id)
  }
}
