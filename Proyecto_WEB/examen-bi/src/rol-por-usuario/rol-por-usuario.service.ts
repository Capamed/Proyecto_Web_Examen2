import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RolPorUsuarioEntity} from "./rol-por-usuario.entity";

@Injectable()
export class RolPorUsuarioService {
    constructor(
        @InjectRepository(RolPorUsuarioEntity)
        private readonly _rolPorUsuarioService: Repository<RolPorUsuarioEntity>){
}

        traerTodo(){
            return this._rolPorUsuarioService.find()
        }

}