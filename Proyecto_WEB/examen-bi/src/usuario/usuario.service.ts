import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository (UsuarioEntity)
        private readonly _usuarioService: Repository<UsuarioEntity>){

    }

    traerUsuario(){
        return this._usuarioService.find()
    }
}