import { HttpException, Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {UsersService} from 'src/users/users.service'
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {


constructor(
  @InjectRepository(Users)
  private readonly userRepository:Repository<Users>,
  private readonly userService:UsersService
 ){}



  async register(registerDto: registerDto) {

    const user=await this.userService.findUserByEmail(registerDto.email)

    if(user){
      throw new HttpException('User already exists',400);


    }

     registerDto.passWord=await bcrypt.hash(registerDto.passWord,10);
return await this.userService.createUser(registerDto);

  }


  login(loginDto:loginDto){

  }
}


