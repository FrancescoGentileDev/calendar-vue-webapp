import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {getEnvPath} from './common/helper/env.helper'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000)
}
bootstrap()
