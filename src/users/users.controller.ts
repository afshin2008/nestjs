import { Controller,Get, Post } from '@nestjs/common';
import {UsersService} from './users.service';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
   async hello(){
       
        return await this.usersService.findAll();
    }

    @Post()
    async createUser(){
        return await this.usersService.createUser();
        
    }

}
