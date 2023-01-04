import {Module} from '@nestjs/common'
import {UsersModule} from 'src/users/users.module'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {LocalStrategy} from './local.strategy'
import {PassportModule} from '@nestjs/passport'
import session from 'express-session'
import {SessionSerializer} from './session.serializer'
@Module({
  imports: [
    UsersModule,
    AuthModule,
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
