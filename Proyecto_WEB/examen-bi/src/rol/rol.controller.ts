import {Controller, Get, Post, Res, Body, Param} from "@nestjs/common";
import { RolService } from "./rol.service";
import { RolDto } from "src/dto/rol.dto";
import { response } from "express";


@Controller('rol')


export  class RolController {

    constructor(
        private readonly _rolService:RolService,

    ){}

  

    @Get('crear-rol')
    crearRol(
        @Res() response,
    ){
        response.render('crear-rol')
    }


    @Post('crear-rol')
    async crearRolPost(
        @Res() response,
        @Body()rolCrear,
    ){
        const rol = new RolDto
        rol.rol_nombre = rolCrear.nombre,
        await this._rolService.crearRol(rol)
        response.redirect('asignar-rol')
    }
    
    
    @Get('asignar-rol')
    async asignarRol(
        @Res() response,

    ){
        const roles:Rol[] = []
        const respuesta = await this._rolService.obtenerRol();
        response.render('asignar-rol',{respuesta});
    }

}

export interface Rol{
id:number,
rol_nombre:string,
}