import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LibroEntity } from "./libro.entity";
import { LibroCreateDto } from "./libro-create-dto/libro-create.dto";
import { LibroUpdateDto } from "./libro-update-dto/libro-update.dto";

@Injectable()

export class LibroService {
    constructor(
        @InjectRepository(LibroEntity)
        private readonly _libroRepository: Repository<LibroEntity>
    ) { }

    async findOne(id: number) {
        return await this._libroRepository.findOne(id);
    }

    async findAll() {
        return await this._libroRepository.find();
    }

    async create(datosCrearLibro: LibroCreateDto) {
        return await this._libroRepository.save(datosCrearLibro)
    }

    async delete(id: number) {
        return await this._libroRepository.delete(id);
    } 

    async update(id: number, datosEditarLibro: LibroUpdateDto) {
        const editarLibro = this.findOne(id)
        if (editarLibro) {
            return await this._libroRepository.update(id, datosEditarLibro)
        } else {
            console.log('pelicula no econtrada, no se lo actualizara')
        }
    }
    
}
