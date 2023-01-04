import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from '../users/users.service';

@Injectable()
export class HasPermissionGuardId implements CanActivate {
  constructor(private UsersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let user = (await this.UsersService.findOneByEmail(request.user.email));
    return request.user.id === parseInt( request.params.id, 10) || user.is_admin;
  }
}
