import { IsNotEmpty, IsString, IsNumber,  IsOptional, IsDateString, IsBooleanString } from "class-validator";

export class EventoUpdateDto {

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