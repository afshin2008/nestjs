import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users) 
        private readonly user_repository:Repository<Users>,
    ){}

    createUser=async (data:createUserDto)=>{

    const user=this.user_repository.create(data);

    this.user_repository.save(user);
    


}



findUserByEmail=async (email:string)=>{

        return await this.user_repository.findOne({
            where:{email:email}
        })
    }

    findAll=async()=> {

   return await this.user_repository.find();
    }



}
