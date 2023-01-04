import {Controller, Post, Get, Request, UseGuards} from '@nestjs/common'
import {AuthenticatedGuard} from './authenticated.guard'
import {LocalAuthGuard} from './local-auth.guard'

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user
  }
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy()
    return {msg: 'The user session has ended'}
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user
  }
}
