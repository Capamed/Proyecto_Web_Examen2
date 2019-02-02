import { IsNotEmpty, IsString, IsNumber,  IsOptional, IsDateString, IsBooleanString } from "class-validator";

export class AutorUpdateDto {

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