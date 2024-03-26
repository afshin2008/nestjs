import { HttpException, Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {UsersService} from 'src/users/users.service'
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {


constructor(
  
 
  private readonly userService:UsersService,
  private readonly jwtService:JwtService,
  private readonly mailerService:MailerService,
 ){}



  async register(registerDto: registerDto) {

    const user=await this.userService.findUserByEmail(registerDto.email);
      

    if(user){
      throw new HttpException('User already exists',400);
   
    
    }

     registerDto.passWord=await bcrypt.hash(registerDto.passWord,10);
  //html:`<b><h1>سلام حدیثه</h1></b><br><h3>ثبت نام با موفقیت انجام شد</h3><br>نام کاربری 
   //   : ${registerDto.userName} <br>ایمیل : ${registerDto.email} <br>`,
 setImmediate(async() => {
 await this.mailerService.sendMail({
    
      text:'سلام حدیثه',
      subject:'افشین',
      to:`${registerDto.email}`,
      template:'wellcome.html',
      context:{
        name:registerDto.userName,
        family:registerDto.last_name
      }
     })
 });


   
    
 

      return await this.userService.createUser(registerDto);

  }


  async login(loginDto:loginDto){

    const user=await this.userService.findUserByEmail(loginDto.email);
    if(!user){
      throw new HttpException("user not exist",400);

    }
  

    const isPasswordMatch=await bcrypt.compare(loginDto.passWord,user.passWord);
   
if(!isPasswordMatch){
  throw new HttpException("wrong password",400);


}
    
const accessToken=this.jwtService.sign(
  {
    sub:user.id,
    email:user.email
  }
);

return{
  access_token:accessToken,
}
  }
}


