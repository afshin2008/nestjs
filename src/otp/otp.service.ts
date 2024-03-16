import { HttpException, Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Code, Repository } from 'typeorm';
import {UsersService} from 'src/users/users.service'
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import Codes from 'src/entities/codes.entity';

@Injectable()
export class OtpService {


constructor(
  
 
  private readonly userService:UsersService,
  private readonly jwtService:JwtService,
  @InjectRepository(Codes) private readonly codes_repository:Repository<Codes>
 ){}



  async register(registerDto: registerDto) {

    const user=await this.userService.findUserByEmail(registerDto.email);
      

    if(user){
      throw new HttpException('User already exists',400);
   
    
    }

     registerDto.passWord=await bcrypt.hash(registerDto.passWord,10);
      return await this.userService.createUser(registerDto);

  }


  async login(loginDto:loginDto){

    const user=await this.userService.findUserByEmail(loginDto.email);
    if(!user){
      throw new HttpException("user not exist",400);

    }
  

if(loginDto.code){

  const check=await this.codes_repository.findOne({
where:{
  code:loginDto.code,
  email:loginDto.email,
  is_used:false
}    
  });


  if(check){

    await this.codes_repository.update(check,{
      is_used:true
    });

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
  else
  {

     throw new HttpException("code is not valid",400);
  }





}
else
{


  //generate 5 digit otp code

const otp=await this.generateOtpCode();


  // save otp code to dataBase

this.codes_repository.save({
  code:otp,
  email:loginDto.email
})


//this.sendEmail();

  //send otp code to user


  return {code:otp};
}
   

    

  }


  async generateOtpCode(){

let code:number=null;

while(!code){

  const fiveDigitCode:number=this.getRandomCode();

 const checkCode= await this.codes_repository.findOne({
    where:{
      code:fiveDigitCode
    }
  })

  if(!checkCode)
  {
    code=fiveDigitCode;
    break;
  }
}

return code;
  }

   getRandomCode():number{

    const min=10000;
    const max=99999;
    const otp:number=Math.floor(Math.random()*(max-min+1)+min);
return otp;

  }
}


