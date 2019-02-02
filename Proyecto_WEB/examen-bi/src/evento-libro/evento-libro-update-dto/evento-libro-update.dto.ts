import { IsOptional } from "class-validator";

export class EventoLibroUpdateDto {

    @IsOptional()
    id?: number;

}