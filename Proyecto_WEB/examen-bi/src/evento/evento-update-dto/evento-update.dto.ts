import { IsNotEmpty, IsString, IsNumber,  IsOptional, IsDateString, IsBooleanString } from "class-validator";

export class EventoUpdateDto {

    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    nombre?: string;

    @IsNotEmpty()
    @IsDateString()
    fecha?: string;

    @IsNotEmpty()
    @IsNumber()
    latitud?: number;

    @IsNotEmpty()
    @IsNumber()
    longitud?: number;

}