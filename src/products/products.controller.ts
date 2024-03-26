import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {userGuard} from 'src/users/dto/userGuard.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { I18n, I18nContext } from 'nestjs-i18n';


//@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()

  create(@Body() createProductDto: CreateProductDto,@Request() request) {

    const user:userGuard=request.user;

    
    console.log(user);

         createProductDto.user=user;
    
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
   // return {message:i18n.t('tr.hello',{args:{name:'afshin'}})}


   //@I18n() i18n:I18nContext
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Request() request) {

    const user:userGuard=request.user;
    console.log(user);
    updateProductDto.user=user;



    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Request() request) {
    const user=request.user;

    return this.productsService.remove(+id,user);
  }
}
