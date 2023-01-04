import { Injectable, Req, BadRequestException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Clients } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { UsersService } from './../users/users.service';
import { isEmpty } from 'class-validator';
@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private clientsRepository: Repository<Clients>,
    private readonly UsersService: UsersService,
  ) { }

  async create(clients: object, id: any) {

    let {password, ...user} = await this.UsersService.findOne(id)
    let client = this.clientsRepository.create({
      ...clients,
      user,

    })
    return this.clientsRepository.save(client)
  }

  async getClientsByUser(id: any) {
    let clients = await this.clientsRepository.find({where: {user: {id}}})
    return clients
  }

  findOneWithUser(id: number) {
    return this.clientsRepository.findOne({ where: { id }, relations: ['user'] })
  }

  findOne(id: number) {
    return this.clientsRepository.findOne({ where: { id } })
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    console.log(updateClientDto)
    if (!Object.keys(updateClientDto).length) throw new BadRequestException('Empty body');
    this.clientsRepository.update(id, updateClientDto)
    return this.findOne(id)
  }

  remove(id: number) {
    return this.clientsRepository.delete(id)
  }
}
