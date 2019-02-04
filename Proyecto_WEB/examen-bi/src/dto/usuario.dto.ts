import {Column} from "typeorm";
import {IsInt, IsNotEmpty, IsOptional, IsString, IsDateString, MaxLength, MinLength, IsEmail} from "class-validator";

export class UsuarioDto {

    @IsOptional()
    @IsInt()
    id?:number;

    @IsString()
    @IsNotEmpty()
    nombre_usuario?:string;

    // @IsString()
    @IsNotEmpty()
    @IsEmail()
    email_usuario?:string;


    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password_usuario?:string;


    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento_usuario?:string;

}