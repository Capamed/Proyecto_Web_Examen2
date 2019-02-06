import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBooleanString, IsDateString, IsAlpha, IsInt, IsBoolean } from "class-validator";

export class AutorDto {

    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsAlpha()
    nombre_autor?: string;

    @IsNotEmpty()
    @IsAlpha()
    apellido_autor?: string;

    @IsNotEmpty()
    @IsDateString()
    fecha_nacimiento?: string;

    @IsNotEmpty()
    @IsInt()
    numero_libros?: number;

    @IsNotEmpty()
    @IsBoolean()
    ecuatoriano?: boolean;

}