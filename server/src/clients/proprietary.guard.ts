import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import { UsersService } from './../users/users.service';
import { ClientsService } from './clients.service';

@Injectable()
export class ProprietaryGuard implements CanActivate {
  constructor(
    private readonly ClientsService: ClientsService,
    private readonly UsersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const client = await this.ClientsService.findOneWithUser(request.params.id)
    const user = await this.UsersService.findOne(request.user.id)
    if(!client) return false
    return client.user.id === request.user.id || user.is_admin
  }
}
