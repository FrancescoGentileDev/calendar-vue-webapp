import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common'
import {UsersService} from './users.service'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import { AuthenticatedGuard } from './../auth/authenticated.guard';
import { HasPermissionGuardId } from '../auth/hasPermissionId.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
  @UseGuards(AuthenticatedGuard, HasPermissionGuardId)
  @Get()
  findAll() {
    return this.usersService.findAll()
  }
  @UseGuards(AuthenticatedGuard, HasPermissionGuardId)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @UseGuards(AuthenticatedGuard, HasPermissionGuardId)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @UseGuards(AuthenticatedGuard, HasPermissionGuardId)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
