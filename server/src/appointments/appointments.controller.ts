import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ProprietaryGuard } from './proprietary.guard';
@UseGuards(AuthenticatedGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}


  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req: any) {
    return this.appointmentsService.create(createAppointmentDto, req.user.id);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.appointmentsService.findAll(req.user.id);
  }

  @UseGuards(ProprietaryGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }
  @UseGuards(ProprietaryGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }
  @UseGuards(ProprietaryGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
