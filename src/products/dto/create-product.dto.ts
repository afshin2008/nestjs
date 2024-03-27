import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { userGuard } from "src/users/dto/userGuard.dto";

import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
@IsString()
@IsNotEmpty()
@ApiProperty()
     title:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @ApiProperty()
     description:string;
    @IsOptional()
    @ApiProperty({
        minLength:50,
        type:"array",
        items:{
type:'string'
        },
        description:"llll",
        example:"8888",
        default:0
    }) 
     price:number;
    @IsOptional()
   
    user:userGuard;

}
