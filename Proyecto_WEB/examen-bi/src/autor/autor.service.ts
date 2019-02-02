import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AutorEntity } from "./autor.entity";
import { AutorCreateDto } from "./autor-create-dto/autor-create.dto";
import { AutorUpdateDto } from "./autor-update-dto/autor-update.dto";

@Injectable()
export class AutorService {
    constructor(
        @InjectRepository(AutorEntity)
        private readonly _autorRepository: Repository<AutorEntity>
    ) { }

    async findOne(id: number) {
        return await this._autorRepository.findOne(id);
    }

    async findAll() {
        return await this._autorRepository.find();
    }

    async create(datosCrearActor: AutorCreateDto) {
        return await this._autorRepository.save(datosCrearActor)
    }

    async delete(id: number) {
        return await this._autorRepository.delete(id);
    } 

    
    async update(id: number, datosEditarAutor: AutorUpdateDto) {
        const editarAutor = this.findOne(id)
        if (editarAutor) {
            return await this._autorRepository.update(id, datosEditarAutor)
        } else {
            console.log('usuario no econtrado, se lo actualizara')
        }
    }
    
}
