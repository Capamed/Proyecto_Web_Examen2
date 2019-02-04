import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class CredencialesDto{

    @IsString()
    @IsNotEmpty()
    nombre_usuario?:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password_usuario?:string;

}