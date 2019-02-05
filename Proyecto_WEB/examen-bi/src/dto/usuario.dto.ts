import {Column} from "typeorm";
import {IsInt, IsNotEmpty, IsOptional, IsString, IsDateString, MaxLength, MinLength, IsEmail, Matches, IsAlpha} from "class-validator";

export class UsuarioDto {

    @IsOptional()
    @IsInt()
    id?:number;

    @IsNotEmpty()
    @IsAlpha()
    nombre_usuario?:string;


    @IsNotEmpty()
    @IsEmail()
    email_usuario?:string;


    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/)
    @IsString()
    @IsNotEmpty()
    password_usuario?:string;


    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento_usuario?:string;

}