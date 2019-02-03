import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBooleanString, IsDateString } from "class-validator";

export class AutorCreateDto {

    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    nombre_autor?: string;

    @IsNotEmpty()
    @IsString()
    apellido_autor?: string;

    @IsNotEmpty()
    @IsDateString()
    fecha_nacimiento?: string;

    @IsNotEmpty()
    @IsNumber()
    numero_libros?: number;

    @IsNotEmpty()
    @IsBooleanString()
    ecuatoriano?: boolean;

}