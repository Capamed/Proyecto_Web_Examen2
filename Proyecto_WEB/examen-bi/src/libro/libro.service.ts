import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LibroEntity } from "./libro.entity";

@Injectable()

export class LibroService {
    constructor(
        @InjectRepository(LibroEntity)
        private readonly _libroRepository: Repository<LibroEntity>
    ) { }

    
    async buscarPorIdPacie(idPaciente: number):Promise <MedicamentoEntity[]>{
        const medicamentoUsuario: FindManyOptions<MedicamentoEntity> =
            { where: {
                    paciente: idPaciente
                }}
        return await this._medicamentoRepository.find(medicamentoUsuario)
    }




    //buscar
    buscar( parametros?: FindManyOptions<MedicamentoEntity>): Promise<MedicamentoEntity[]> {



        return this._medicamentoRepository.find(parametros)
    }

    async crear(nuevoMedicamento: Medicamento): Promise<MedicamentoEntity> {

        // Instanciar una entidad -> .create()
        const medicamentoEntity = this._medicamentoRepository.create(nuevoMedicamento);
        const medicamentoCreado = await this._medicamentoRepository.save(medicamentoEntity);
        return medicamentoCreado;
    }

    actualizar(id: number, nuevoMedicamento: Medicamento): Promise<MedicamentoEntity> {

        nuevoMedicamento.id = id;
        const medicamentoEntity = this._medicamentoRepository.create(nuevoMedicamento);
        return this._medicamentoRepository.save(medicamentoEntity)
    }

    borrar(id: number): Promise<MedicamentoEntity> {
        const medicamentoEntityEliminar = this._medicamentoRepository.create({
            id: id
        });
        return this._medicamentoRepository.remove(medicamentoEntityEliminar)
    }

    buscarPorId(id: number): Promise<MedicamentoEntity> {
        return this._medicamentoRepository.findOne(id)
    }

   async buscarPorIdAutor(idPaciente: number):Promise <MedicamentoEntity[]>{
        const medicamentoUsuario: FindManyOptions<MedicamentoEntity> =
            { where: {
                paciente: idPaciente
                }}
                return await this._medicamentoRepository.find(medicamentoUsuario)
    }



    
}
