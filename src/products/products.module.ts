import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Products from 'src/entities/products.entity';
import Users from 'src/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Products]),TypeOrmModule.forFeature([Users])],
  controllers: [ProductsController],
  providers: [ProductsService,UsersService],
})
export class ProductsModule {}
