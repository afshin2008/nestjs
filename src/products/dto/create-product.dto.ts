import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { userGuard } from "src/users/dto/userGuard.dto";

export class CreateProductDto {
@IsString()
@IsNotEmpty()
     title:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
     description:string;
    @IsOptional()
     price:string;
    

    @IsOptional()
    user:userGuard;

}
