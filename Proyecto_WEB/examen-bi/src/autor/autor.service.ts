import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { AutorEntity } from './autor.entity';
import { CreateAutorDto } from './autor-create-dto/create-autor.dto';
import { AutorUpdateDto } from './autor-update-dto/autor-update.dto';
import { AutorInterface } from './autor.interface';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(AutorEntity)
    private readonly _autorRepository: Repository<AutorEntity>,
  ) {
  }

  async findLike(parametrosBusqueda?: FindManyOptions<AutorEntity>)
    : Promise<AutorEntity[]> {
    return this._autorRepository.find(parametrosBusqueda);
  }

  async findOne(id: number) {
    return await this._autorRepository.findOne(id);
  }

  async findAll() {
    return await this._autorRepository.find();
  }

  async create(autor: AutorInterface) {
    const autorEntity: AutorEntity = this._autorRepository.create(autor);
    return await this._autorRepository.save(autorEntity);
  }

  async delete(id: number) {
    return await this._autorRepository.delete(id);
  }


  async update(id: number, datosEditarAutor: AutorUpdateDto) {
    const editarAutor = this.findOne(id);
    if (editarAutor) {
      return await this._autorRepository.update(id, datosEditarAutor);
    } else {
      console.log('usuario no econtrado, se lo actualizara');
    }
  }

}
