import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session'
import {ConfigService} from '@nestjs/config';

import {ValidationPipe } from '@nestjs/common';


import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {

  

  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    whitelist:false,
  }));
app.use(session({
  secret:'secret',
}));


const configService=app.get(ConfigService);


const PORT=configService.get<number>("port");
console.log(PORT);


  app.use(passport.initialize());
    app.use(passport.session());



const config=new DocumentBuilder().
setTitle('آموزشی').
setDescription(' سایت مدیریت آموزشی').
setVersion('1.0').
build();

const document=SwaggerModule.createDocument(app,config);

SwaggerModule.setup('docs',app,document);




  await app.listen(3000);

  //console.log(__dirname);
  
}
bootstrap();
