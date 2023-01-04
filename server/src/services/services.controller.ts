import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthenticatedGuard } from './../auth/authenticated.guard';
import { ProprietaryGuard } from './proprietary.guard';

@UseGuards(AuthenticatedGuard)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto, @Req() req: any) {
    return this.servicesService.create(createServiceDto, req.user.id);
  }

  @Get()
  getServicesByUser(@Req() req: any) {
    return this.servicesService.getServicesByUser(req.user.id);
  }

  @UseGuards(ProprietaryGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @UseGuards(ProprietaryGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @UseGuards(ProprietaryGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
