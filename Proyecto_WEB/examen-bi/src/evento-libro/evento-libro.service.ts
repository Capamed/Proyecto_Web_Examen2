import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventoLibroCreateDto } from "./evento-libro-create-dto/evento-libro-create.dto";
import { EventoLibroUpdateDto } from "./evento-libro-update-dto/evento-libro-update.dto";
import { EventoLibroEntity } from "./evento-libro.entity";

@Injectable()

export class EventoLibroService {
    constructor(
        @InjectRepository(EventoLibroEntity)
        private readonly _eventoLibroRepository: Repository<EventoLibroEntity>
    ) { }

    async findOne(id: number) {
        return await this._eventoLibroRepository.findOne(id);
    }

    async findAll() {
        return await this._eventoLibroRepository.find();
    }

    async create(datosCrearEventoLibro: EventoLibroCreateDto) {
        return await this._eventoLibroRepository.save(datosCrearEventoLibro)
    }

    async delete(id: number) {
        return await this._eventoLibroRepository.delete(id);
    } 

    async update(id: number, datosEditarEventoLibro: EventoLibroUpdateDto) {
        const editarEventoLibro = this.findOne(id)
        if (editarEventoLibro) {
            return await this._eventoLibroRepository.update(id, datosEditarEventoLibro)
        } else {
            console.log('usuario no econtrado, se lo actualizara')
        }
    }
    
}
