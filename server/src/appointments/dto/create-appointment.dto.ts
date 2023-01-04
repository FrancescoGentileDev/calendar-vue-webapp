import { IsDate, IsBoolean, IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateAppointmentDto {
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date: Date

  @IsString()
  @IsOptional()
  note: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  confirmNotification: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  reminderNotification: boolean;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  serviceId: number;


}
