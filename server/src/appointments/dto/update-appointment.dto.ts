import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsDate, IsBoolean, IsString, IsNumber, IsOptional } from 'class-validator';
import { BeforeRecover } from 'typeorm';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  
  date: Date;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;

  @IsBoolean()
  @IsOptional()
  isCancelled: boolean;

  note: string;

  confirmNotification: boolean;
 
  reminderNotification: boolean;

  clientId: number;

  serviceId: number;
}
