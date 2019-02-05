import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, FindOneOptions, FindManyOptions} from "typeorm";
import {RolPorUsuarioEntity} from "./rol-por-usuario.entity";

@Injectable()
export class RolPorUsuarioService {
    constructor(
        @InjectRepository(RolPorUsuarioEntity)
        private readonly _rolPorUsuarioService: Repository<RolPorUsuarioEntity>){
}

       
    async verificarRol(idUsuario: number): Promise<RolPorUsuarioEntity> {
        const consulta: FindOneOptions<RolPorUsuarioEntity> = {
            where: {
                usuario: idUsuario,

            },
            relations:['rol','usuario']
        };
        return await this._rolPorUsuarioService.findOne(consulta);
    }


    
    async obtenerRoles(idUsuario: number): Promise<RolPorUsuarioEntity[]> {

        const consulta: FindManyOptions<RolPorUsuarioEntity> = {
            where: {
                usuario: idUsuario,
            },
            relations:['rol','usuario']
        };
        return await this._rolPorUsuarioService.find(consulta);
    }

    borrar(id: number): Promise<RolPorUsuarioEntity> {
        const rolUsuarioEntityEliminar = this._rolPorUsuarioService.create({
            id: id
        });
        return this._rolPorUsuarioService.remove(rolUsuarioEntityEliminar)
    }


    async buscarPorId(idRolPorUsuario: number): Promise<RolPorUsuarioEntity> {

        const consulta: FindOneOptions<RolPorUsuarioEntity> = {
            where: {
                id: idRolPorUsuario,

            },
            relations:['usuario']
        };
        return await this._rolPorUsuarioService.findOne(consulta);
    }


    
}