import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import {OtpModule} from './otp/otp.module'
import Users from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, HeaderResolver, I18n, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import {MailerModule} from '@nestjs-modules/mailer'
import * as dotenv from 'dotenv';
import '@nestjs/swagger';
dotenv.config();
import {EjsAdapter} from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
@Module({ 
  imports: [
    MailerModule.forRoot({
      transport: {
        host:process.env.EMAIL_SERVER_HOST,
        port:parseInt(process.env.EMAIL_SERVER_PORT) ,
        secure: true,
        auth: { 
 
          user: process.env.EMAIL_USERNAME,
            
          pass: process.env.EMAIL_PASSWORD
  
        }   
      }, 
      defaults:{
        from:"افشین <fhafshin@gmail.com>",
      },
      template:{
        dir:process.cwd()+'/templates',
        adapter:new EjsAdapter(),
        options:{
          strict:false
        }


      }
    }),
  I18nModule.forRoot(
{
  fallbackLanguage: 'en',
  loaderOptions:{
    path:path.join(__dirname,'i18n'),
    watch:true
  },
  resolvers:[
    new HeaderResolver(["x-custom-lang"]),
    new QueryResolver(["lang"]),
    new AcceptLanguageResolver()
  ]
}
  ),
    ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:process.env.DATABASE_PASSWORD,
    database:'test',
    entities:[__dirname+'/**/*.entity{.ts,.js}'],
    synchronize:true

  }),
  TypeOrmModule.forFeature([Users]),
  UsersModule, ProductsModule, AuthModule,OtpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer:MiddlewareConsumer){

    consumer.apply(LoggerMiddleware).forRoutes('*');
console.log(__dirname);

  }
}
