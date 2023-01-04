import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Body,
} from "@nestjs/common";
import { AuthenticatedGuard } from "./authenticated.guard";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateUserDto } from "./../users/dto/create-user.dto";
import { AuthService } from './auth.service';
import { HasPermissionGuardId } from "./hasPermissionId.guard";

@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req) {
    return {
      user: req.user,
      msg: "The user has been logged in",
    };
  }
  @Get("/logout")
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: "The user session has ended" };
  }

  @UseGuards(AuthenticatedGuard, HasPermissionGuardId)
  @Get("/protected/:id")
  getHello(@Request() req): string {
    return req.user;
  }
}
