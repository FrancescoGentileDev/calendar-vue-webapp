import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ProprietaryGuard } from './proprietary.guard';

@UseGuards(AuthenticatedGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto, @Req() req: any) {
    return this.clientsService.create(createClientDto, req.user.id);
  }

  @Get()
  getClientsByUser(@Req() req: any) {
    return this.clientsService.getClientsByUser(req.user.id);
  }

  @UseGuards(ProprietaryGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @UseGuards(ProprietaryGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @UseGuards(ProprietaryGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
