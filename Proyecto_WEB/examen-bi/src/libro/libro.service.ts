import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindManyOptions } from "typeorm";
import { LibroEntity } from "./libro.entity";
import { LibroInterface } from "./libro.controller";

@Injectable()

export class LibroService {
    constructor(
        @InjectRepository(LibroEntity)
        private readonly _libroRepository: Repository<LibroEntity>
    ) { }

    
    async buscarPorIdPacie(idPaciente: number):Promise <LibroEntity[]>{
        const medicamentoUsuario: FindManyOptions<LibroEntity> =
            { where: {
                    paciente: idPaciente
                }}
        return await this._libroRepository.find(medicamentoUsuario)
    }




    //buscar
    buscar( parametros?: FindManyOptions<LibroEntity>): Promise<LibroEntity[]> {



        return this._libroRepository.find(parametros)
    }

    async crear(nuevoLibro: LibroInterface): Promise<LibroEntity> {

        // Instanciar una entidad -> .create()
        const medicamentoEntity = this._libroRepository.create(nuevoLibro);
        const medicamentoCreado = await this._libroRepository.save(medicamentoEntity);
        return medicamentoCreado;
    }

    actualizar(id: number, nuevoLibro: LibroInterface): Promise<LibroEntity> {

        nuevoLibro.id = id;
        const medicamentoEntity = this._libroRepository.create(nuevoLibro);
        return this._libroRepository.save(medicamentoEntity)
    }

    borrar(id: number): Promise<LibroEntity> {
        const medicamentoEntityEliminar = this._libroRepository.create({
            id: id
        });
        return this._libroRepository.remove(medicamentoEntityEliminar)
    }

    buscarPorId(id: number): Promise<LibroEntity> {
        return this._libroRepository.findOne(id)
    }

   async buscarPorIdAutor(idPaciente: number):Promise <LibroEntity[]>{
        const medicamentoUsuario: FindManyOptions<LibroEntity> =
            { where: {
                paciente: idPaciente
                }}
                return await this._libroRepository.find(medicamentoUsuario)
    }



    
}
