import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import { UsersService } from './../users/users.service';
import { ServicesService } from './services.service';

@Injectable()
export class ProprietaryGuard implements CanActivate {
  constructor(
    private readonly ServicesService: ServicesService,
    private readonly UsersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const service = await this.ServicesService.findOneWithUser(request.params.id)
    const user = await this.UsersService.findOne(request.user.id)
    if(!service) return false
    return service.user.id === request.user.id || user.is_admin
  }
}
