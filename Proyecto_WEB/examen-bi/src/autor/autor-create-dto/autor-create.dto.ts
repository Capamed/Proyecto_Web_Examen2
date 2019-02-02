import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBooleanString, IsDateString } from "class-validator";

export class AutorCreateDto {

    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    nombres?: string;

    @IsNotEmpty()
    @IsString()
    apellidos?: string;

    @IsNotEmpty()
    @IsDateString()
    fechaNacimiento?: string;

    @IsNotEmpty()
    @IsNumber()
    numeroLibros?: number;

    @IsNotEmpty()
    @IsBooleanString()
    ecuatoriano?: boolean;

}