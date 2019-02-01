import {Controller, Get} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')

export class UsuarioController {

    constructor(
        private readonly _usuarioService:UsuarioService
    ){

    }


    @Get()
    async  todos(){

        return await this._usuarioService.traerUsuario()

    }
}