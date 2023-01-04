import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from './entities/appointment.entity';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule } from './../clients/clients.module';
import { ServicesModule } from 'src/services/services.module';
@Module({
  imports: [UsersModule, ClientsModule, ServicesModule, TypeOrmModule.forFeature([Appointments])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService]
})
export class AppointmentsModule { }
