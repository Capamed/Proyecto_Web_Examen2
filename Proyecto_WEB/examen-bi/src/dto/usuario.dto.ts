import {Column} from "typeorm";
import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UsuarioDto {

    @IsOptional()
    @IsInt()
    id:number;

    @IsString()
    @IsNotEmpty()
    nombre_usuario:string;

    @IsString()
    @IsNotEmpty()
    email_usuario:string;


    @IsString()
    @IsNotEmpty()
    password_usuario:string;


    @IsString()
    @IsNotEmpty()
    fecha_nacimiento_usuario:string;

}