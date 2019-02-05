import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {Repository, FindManyOptions} from "typeorm";
import { UsuarioDto } from "src/dto/usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository (UsuarioEntity)
        private readonly _usuarioService: Repository<UsuarioEntity>){

    }

    async credenciales(usuario:UsuarioDto):Promise<UsuarioEntity>{
        const consulta = {
            where: {
                email_usuario: usuario.email_usuario,
                password_usuario: usuario.password_usuario
            }

        }
        return await this._usuarioService.findOne(consulta);
    }


    async crearUsuario(nuevoUsuario: UsuarioDto): Promise<UsuarioEntity> {
        const usuarioEntity = this._usuarioService.create(nuevoUsuario);
        const usuarioCreado = await this._usuarioService.save(usuarioEntity);
        return usuarioCreado;
    }

    buscar(parametros?: FindManyOptions<UsuarioEntity>): Promise<UsuarioEntity[]> {
        return this._usuarioService.find(parametros)
    }


    borrar(id: number): Promise<UsuarioEntity> {
        const usuarioEntityEliminar = this._usuarioService.create({
            id: id
        });
        return this._usuarioService.remove(usuarioEntityEliminar)
    }

    buscarPorId(id: number): Promise<UsuarioEntity> {
        return this._usuarioService.findOne(id)
    }



}