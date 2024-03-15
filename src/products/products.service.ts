import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Products from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
   @InjectRepository(Products) private products_repository:Repository<Products>
   
   ) {}


   async create(data: CreateProductDto) {
   const new_product=await this.products_repository.save(data);

   
   return new_product;

      


    
  }

  findAll() {
   return this.products_repository.find({
    relations:{
      user:true
    }
   });


  }

  findOne(id: number) {
    return this.products_repository.findOne({

      where:{
        id,
      }
    });


  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.products_repository.update({id},{...updateProductDto});
  }

  remove(id: number) {
    return this.products_repository.delete(id)
  }
}
