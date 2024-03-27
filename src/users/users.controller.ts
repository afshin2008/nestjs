import { Body, Controller,Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import {UsersService} from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {  multerOption } from 'src/helpers/multer.config';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
   async hello(){
       
        return await this.usersService.findAll();
    }
   

    @Post()
    @UseInterceptors(FileInterceptor('avatar',multerOption))
    async uploadAvatar(@UploadedFile() file:any){
     
console.log(file);
return{};
    }
    

}
