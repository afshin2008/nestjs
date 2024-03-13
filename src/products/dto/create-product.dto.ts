import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto {
@IsString()
@IsNotEmpty()
    readonly title:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    readonly description:string;
    @IsOptional()
    readonly price:string;
    
}
