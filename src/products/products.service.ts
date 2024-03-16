import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Products from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { userGuard } from 'src/users/dto/userGuard.dto';

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

  async findOne(id: number) {
    const product=await this.products_repository.findOne({

      where:{
        id,
      }
    });

    if(!product) {
      throw new HttpException("product not found", 404);
    }
    
return product;

  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const check=await this.products_repository.update({id,user:updateProductDto.user},{...updateProductDto});

    if(check.affected===0)
    throw new HttpException("product not found",404);

    return{}
  }

  async remove(id: number,user:userGuard) {
    const check= this.products_repository.createQueryBuilder("products")
    .leftJoinAndSelect('products.user','users')
    .where('products.id=:id',{id})
    .andWhere('products.user=:user',{user:user.id}).getOne();;

   
    
    if(!check)
    throw new HttpException("product not found",404);

         console.log(check);

 //await this.products_repository.createQueryBuilder("products").softDelete().where("id=:id",{id}).execute();
 await this.products_repository.createQueryBuilder("products").delete().where("id=:id",{id}).execute();


  }
}
