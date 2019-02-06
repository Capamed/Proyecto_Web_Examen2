import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindManyOptions } from "typeorm";
import { EventoEntity } from "./evento.entity";
import { EventoInterface } from "./evento.controller";



@Injectable()

export class EventoService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly _eventoRepository: Repository<EventoEntity>
    ) { }

   
    buscar(parametros?: FindManyOptions<EventoEntity>): Promise<EventoEntity[]> {
        return this._eventoRepository.find(parametros)
    }

    async crear(evento: EventoInterface): Promise<EventoEntity> {
        const eventoEntity = this._eventoRepository.create(evento);
        const eventoCreado = await this._eventoRepository.save(eventoEntity);
        return eventoCreado;
    }
    
}
