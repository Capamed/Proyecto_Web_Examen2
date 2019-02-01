import {Controller, Get, Post, Res} from "@nestjs/common";
import { RolService } from "./rol.service";
import { RolDto } from "src/dto/rol.dto";
import { response } from "express";

@Controller('rol')


export  class RolController {

    constructor(
        private readonly _rolService:RolService,

    ){

    }

    @Get('rol')
    rol(
    ){
        const rol = new RolDto
        rol.rol_nombre = 'admin'
        this._rolService.crearRol(rol)
        return 'ok'

    }

    @Get('crear-rol')
    crearRol(
        @Res() response,
    ){
        response.render('crear-rol')
    }

    
    @Get('asignar-rol')
    async asignarRol(
        @Res() response,
    ){
        const respuesta = await this._rolService.obtenerRol();
        response.render('asignar-rol',{respuesta});
    }

}