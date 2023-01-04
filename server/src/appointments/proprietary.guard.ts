import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import { UsersService } from './../users/users.service';
import { AppointmentsService } from './appointments.service';

@Injectable()
export class ProprietaryGuard implements CanActivate {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const appointment = await this.appointmentsService.findOneWithUser(request.params.id)
    if(!appointment) return false
    return appointment.user.id === request.user.id || appointment.user.is_admin
  }
}
