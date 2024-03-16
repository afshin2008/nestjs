import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';


@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post("register")
  register(@Body() data: registerDto) {
    return this.otpService.register(data);
  }

 
  
@Post("login")
login(@Body() data:loginDto){


  console.log(data);
  
  

return this.otpService.login(data);
}
 
}
