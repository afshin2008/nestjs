import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users) 
        private readonly user_repository:Repository<Users>,
    ){}

   async findAll(){

   return await this.user_repository.find();
    }

async createUser(){

    const  user=await this.user_repository.create({
        email:"afshisn@gamil.com",
        first_name:"asadi",
        last_name:"hasani",
        age:25,
        password:"1223"
      });
    
      this.user_repository.save(user);

}

}
