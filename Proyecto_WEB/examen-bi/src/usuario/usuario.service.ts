import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import { UsuarioDto } from "src/dto/usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository (UsuarioEntity)
        private readonly _usuarioService: Repository<UsuarioEntity>){

    }

    traerUsuario(){
        return this._usuarioService.find()
    }

    credenciales(usuario:UsuarioDto){
        const consulta = {
            where: {
                nombre_usuario: usuario.nombre_usuario
            }

        }

        return this._usuarioService.find(consulta)
    }


    crearUsuario(usuario:UsuarioDto){
        console.log('holalsad',usuario)
        const respuesta= this._usuarioService.create(usuario)
        return this._usuarioService.save(respuesta)
    }

}