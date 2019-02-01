import {Controller, Get, Post, Res, Body} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import { UsuarioDto } from "src/dto/usuario.dto";
import { response } from "express";
import { RolController } from "src/rol/rol.controller";
import { RolDto } from "src/dto/rol.dto";
import { RolService } from "src/rol/rol.service";

@Controller('usuario')

export class UsuarioController {

    constructor(
        private readonly _usuarioService:UsuarioService,

    ){

    }


    @Get('login')
    credenciales(
      @Res() response,
    ){
    response.render('login')
    }

    @Get()
    async todos(){
        return await this._usuarioService.traerUsuario()
    }

    @Post('credenciales')
    async metodoCrendenciales(
        @Res() response,
        @Body('username') username,
        @Body('password') password,
    )
    {
        
        console.log(username,password)
        const usuario = new UsuarioDto
        usuario.nombre_usuario = username
        usuario.password_usuario = password
        console.log(usuario)
        const respuesta = await this._usuarioService.credenciales(usuario)
        console.log(respuesta)
        return respuesta
    }


    @Get('crear-usuario')
    crearUsuario(
        @Res() response,
    ){
        response.render('crear-usuario')
    }
    
    @Post('crear-usuario')
    async crearUsuarioPost(
        @Body() usuarioCrear,
    ){
        console.log(usuarioCrear)
        const usuario = new UsuarioDto
        usuario.nombre_usuario = usuarioCrear.nombre,
        usuario.email_usuario = usuarioCrear.email,
        usuario.password_usuario = usuarioCrear.password,
        usuario.fecha_nacimiento_usuario = usuarioCrear.fecha_nacimiento

        await this._usuarioService.crearUsuario(usuario)

    }

    




}