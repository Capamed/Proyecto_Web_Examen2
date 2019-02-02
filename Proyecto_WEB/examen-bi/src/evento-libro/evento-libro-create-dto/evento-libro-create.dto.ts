import { IsOptional } from "class-validator";

export class EventoLibroCreateDto {

    @IsOptional()
    id?: number;

}