import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'
import { getEnvPath } from './common/helper/env.helper'
var MySQLStore = require('express-mysql-session')(session);

require('dotenv').config()

async function bootstrap() {

  var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'test'
  };

  var sessionStore = new MySQLStore(options);

  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      store: sessionStore,
      saveUninitialized: false,
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000)
}
bootstrap()
