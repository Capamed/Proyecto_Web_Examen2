import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBooleanString, IsDateString } from "class-validator";

export class EventoCreateDto {

    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    nombre_evento?: string;

    @IsNotEmpty()
    @IsDateString()
    fecha_evento?: string;

    @IsNotEmpty()
    @IsNumber()
    latitud_evento?: number;

    @IsNotEmpty()
    @IsNumber()
    longitud_evento?: number;

}