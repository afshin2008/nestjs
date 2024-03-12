import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HozorModule } from './hozor/hozor.module';
import Users from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'ghasem@@HH',
    database:'test',
    entities:[__dirname+'/**/*.entity{.ts,.js}'],
    synchronize:true

  }),
  TypeOrmModule.forFeature([Users]),
  UsersModule, ProductsModule, AuthModule, HozorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer:MiddlewareConsumer){

    consumer.apply(LoggerMiddleware).forRoutes('*');
console.log(__dirname);

  }
}
