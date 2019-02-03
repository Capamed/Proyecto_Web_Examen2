import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventoEntity } from "./evento.entity";
import { EventoUpdateDto } from "./evento-update-dto/evento-update.dto";
import { EventoCreateDto } from "./evento-create-dto/evento-create.dto";


@Injectable()

export class EventoService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly _eventoRepository: Repository<EventoEntity>
    ) { }

    async findOne(id: number) {
        return await this._eventoRepository.findOne(id);
    }

    async findAll() {
        return await this._eventoRepository.find();
    }

    async create(datosCrearEvento: EventoCreateDto) {
        return await this._eventoRepository.save(datosCrearEvento)
    }

    async delete(id: number) {
        return await this._eventoRepository.delete(id);
    } 

    async update(id: number, datosEditarEvento: EventoUpdateDto) {
        const editarEvento = this.findOne(id)
        if (editarEvento) {
            return await this._eventoRepository.update(id, datosEditarEvento)
        } else {
            console.log('usuario no econtrado, se lo actualizara')
        }
    }
    
}
