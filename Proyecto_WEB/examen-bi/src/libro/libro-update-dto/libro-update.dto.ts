import { IsNotEmpty, IsString, IsOptional, IsInt, IsDateString } from "class-validator";

export class LibroUpdateDto {

    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsInt()
    icbn_libro?: number;

    @IsNotEmpty()
    @IsString()
    nombre_libro?: string;

    @IsNotEmpty()
    @IsInt()
    numero_paginas?: number;

    @IsNotEmpty()
    @IsInt()
    edicion?: number;

    @IsNotEmpty()
    @IsDateString()
    fecha_publicacion?: string;

    @IsNotEmpty()
    @IsString()
    nombre_editorial?: string;
    
}
