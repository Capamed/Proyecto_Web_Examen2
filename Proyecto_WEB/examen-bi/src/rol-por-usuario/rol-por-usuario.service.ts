import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, FindOneOptions} from "typeorm";
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
}