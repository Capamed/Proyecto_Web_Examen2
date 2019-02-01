import {Column, PrimaryGeneratedColumn} from "typeorm";
import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class RolDto {
    @IsOptional()
    @IsInt()
    id?:number;

    @IsString()
    @IsNotEmpty()
    rol_nombre:string;
}