import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {ClientsModule} from './clients/clients.module'
import {UsersModule} from './users/users.module'
import {Users} from './users/entities/user.entity'
import {Clients} from './clients/entities/client.entity'
import {AuthModule} from './auth/auth.module'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {getEnvPath} from './common/helper/env.helper'
import {env} from './common/envs/db.connection'
import { ServicesModule } from './services/services.module';
import { Services } from 'src/services/entities/service.entity';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointments } from 'src/appointments/entities/appointment.entity';
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`)

@Module({
  imports: [
UsersModule,
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Users, Clients, Services, Appointments],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ClientsModule,
    AuthModule,
    ServicesModule,
    AppointmentsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
