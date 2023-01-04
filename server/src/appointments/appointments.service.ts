import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointments } from 'src/appointments/entities/appointment.entity';
import { Repository } from 'typeorm';
import { UsersService } from './../users/users.service';
import { ClientsService } from './../clients/clients.service';
import { ServicesService } from './../services/services.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private appointmentsRepository: Repository<Appointments>,
    private readonly UsersService: UsersService,
    private readonly ClientsService: ClientsService,
    private readonly ServicesService: ServicesService,

  ) { }
  async create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    const appointment = new Appointments();
    appointment.date = createAppointmentDto.date;
    appointment.note = createAppointmentDto.note;
    appointment.confirmNotification = createAppointmentDto.confirmNotification;
    appointment.reminderNotification = createAppointmentDto.reminderNotification;
    appointment.user = await this.UsersService.findOne(userId);

    //Verify if the client exists and if user is the owner of the client
    let client = await this.ClientsService.findOneWithUser(createAppointmentDto.clientId);
    if (client.user.id != userId) {
      throw new BadRequestException('Client does not belong to this user')
    }
    //Verify if the service exists and if user is the owner of the service
    let service = await this.ServicesService.findOneWithUser(createAppointmentDto.serviceId);
    if (service.user.id != userId) {
      throw new BadRequestException('Service does not belong to this user')
    }

    appointment.client = client;
    appointment.service = service;
    let saved = await this.appointmentsRepository.save(appointment);
    
    delete saved.user;
    delete saved.client.user;
    delete saved.service.user;
    return saved
  }

  findAll(userId: number) {
    return this.appointmentsRepository.find({ relations: ["client", "service"] , where: { user: { id: userId } } });
  }

  findOne(id: number) {
    return this.appointmentsRepository.findOne({ where: { id }, relations: ["client", "service"] });
  }

  findOneWithUser(id: number) {
    return this.appointmentsRepository.findOne({ where: { id }, relations: ["client", "service", "user"] });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    if (!Object.keys(updateAppointmentDto).length) throw new BadRequestException('Empty body');
    this.appointmentsRepository.update(id, updateAppointmentDto)
    return this.findOne(id)
  }

  remove(id: number) {
    return this.appointmentsRepository.delete(id)
  }
}
