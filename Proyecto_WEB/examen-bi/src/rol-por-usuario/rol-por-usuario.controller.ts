import {Controller, Get, Res, Param, Session, Post} from "@nestjs/common";
import { RolPorUsuarioService } from "./rol-por-usuario.service";
import { RolPorUsuarioEntity } from "./rol-por-usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";
import { stringify } from "querystring";

@Controller('rol-por-usuario')

export class RolPorUsuarioController {
    constructor(
        private readonly _rolPorUsuarioService:RolPorUsuarioService,
        private readonly _usuarioService: UsuarioService
        ){

    }

    @Get('asignar-rol/:idUsuario')
    async mostrarAsignarRol(
        @Res() response,
        @Param('idUsuario') idUsuario,
        @Session() sesion
    ){
        let usuarioRoles: RolPorUsuarioEntity[];

        const usuarioActualizar = await this._usuarioService.buscarPorId(+idUsuario)
        usuarioRoles = await this._rolPorUsuarioService.obtenerRoles(+idUsuario)
        response.render('asignar-roles', {usuario: usuarioActualizar, rolUsuario: usuarioRoles})

    }


    @Post('borrar/:idRolUsuario')
    async borrar(
        @Param('idRolUsuario') idRolUsuario,
        @Res() response
    ) {
        const rolUsuarioEncontrado = await this._rolPorUsuarioService
            .buscarPorId(+idRolUsuario);

        await this._rolPorUsuarioService.borrar(Number(idRolUsuario));

        const parametrosConsulta = `?accion=borrar&nombre=${rolUsuarioEncontrado.id}`;

        response.redirect('/rol-por-usuario/asignar-rol/'+rolUsuarioEncontrado.usuario.id);
    }

}