import {IsEmail, IsNotEmpty, IsOptional} from 'class-validator';

export class loginDto {
@IsEmail()
email:string;
@IsOptional()
code:number;



    
}
