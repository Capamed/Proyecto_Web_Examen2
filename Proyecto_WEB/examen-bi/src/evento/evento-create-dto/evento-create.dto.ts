import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBooleanString, IsDateString } from "class-validator";

export class ActorCreateDto {

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