import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { AutorEntity } from './autor.entity';
import { AutorInterface } from './autor.controller';


@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(AutorEntity)
    private readonly _autorRepository: Repository<AutorEntity>,
  ) {
  }

  buscar(parametros?: FindManyOptions<AutorEntity>): Promise<AutorEntity[]> {
    return this._autorRepository.find(parametros)
}

async crear(nuevoautor: AutorInterface): Promise<AutorEntity> {
    console.log('servciooooo',nuevoautor)
    // Instanciar una entidad -> .create()
    const autorEntity = this._autorRepository.create(nuevoautor);
    const autorCreado = await this._autorRepository.save(autorEntity);
    return autorCreado;
}

actualizar(id: number, nuevoAutor: AutorInterface): Promise<AutorEntity> {

    nuevoAutor.id = id;
    const autorEntity = this._autorRepository.create(nuevoAutor);
    return this._autorRepository.save(autorEntity)
}

borrar(id: number): Promise<AutorEntity> {
    const autorEntityEliminar = this._autorRepository.create({
        id: id
    });
    return this._autorRepository.remove(autorEntityEliminar)
}

buscarPorId(id: number): Promise<AutorEntity> {
    return this._autorRepository.findOne(id)
}
}

