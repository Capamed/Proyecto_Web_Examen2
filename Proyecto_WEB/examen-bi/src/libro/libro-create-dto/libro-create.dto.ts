import { IsNotEmpty, IsString, IsOptional, IsInt, IsDateString } from "class-validator";

export class LibroCreateDto {

    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsInt()
    ICBN?: number;

    @IsNotEmpty()
    @IsString()
    nombre?: string;

    @IsNotEmpty()
    @IsInt()
    numeroPaginas?: number;

    @IsNotEmpty()
    @IsInt()
    edicion?: number;

    @IsNotEmpty()
    @IsDateString()
    fechaNacimiento?: string;

    @IsNotEmpty()
    @IsString()
    nombreEditorial?: string;

}
