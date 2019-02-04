import { Controller, Get, Post, Res, Body, BadRequestException, Query } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto } from "src/dto/usuario.dto";
import { response } from "express";
import { validate } from "class-validator";
import { UsuarioEntity } from "./usuario.entity";
import { FindManyOptions, Like } from "typeorm";
import { CredencialesDto } from "src/dto/credenciales.dto";
import { RolesService } from "./guards";


@Controller('usuario')

export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _rolesService: RolesService,
    ) {
    }

    @Get('login')
    credenciales(
        @Res() response,
    ) {
        response.render('login')
    }

    @Get()
    async todos() {
        return await this._usuarioService.traerUsuario()
    }

    @Post('credenciales')
    async metodoCrendenciales(
        @Res() response,
        @Body('username') username,
        @Body('password') password,
    ) {
        console.log(username, password)
        const usuario = new CredencialesDto
        usuario.nombre_usuario = username
        usuario.password_usuario = password
        const arregloErrores = await validate(usuario);
        const existeErrores = arregloErrores.length > 0;
        if (existeErrores) {
            console.error('Errores: Usuario a crear - ', arregloErrores);
            throw new BadRequestException('Datos incorrectos');
        } else {
            const respuesta = await this._usuarioService.credenciales(usuario)
            const tienesRolAsignado = respuesta[0].rolesPorUsuario.length > 0;
            if (tienesRolAsignado) {
                const rol = respuesta[0].rolesPorUsuario[0].rol.rol_nombre
                switch (rol) {
                    case 'administrador':
                        this._rolesService.esAdministrador = true
                        // throw new BadRequestException('ES ADMIN');
                        // redirecciona a la pagina principal como admin
                        return response.redirect('crear-usuario')
                    // break;
                    case 'usuario':
                        this._rolesService.esUsuario = true
                        // throw new BadRequestException('ES USER');
                        // redirecciona a la pagina principal como user
                        return response.redirect('login')
                    // break;
                    default:
                        throw new BadRequestException('NO ES NADA');
                }
            } else {
                // throw new BadRequestException(':v');
            }


            // return respuesta
            // response.redirect('login');
        }

    }



    @Get('crear-usuario')
    crearUsuario(
        @Res() response,
    ) {
        response.render('crear-usuario')
    }

    @Post('crear-usuario')
    async crearUsuarioPost(
        @Res() response,
        @Body() usuarioCrear,
    ) {
        const usuario = new UsuarioDto
        usuario.nombre_usuario = usuarioCrear.nombre;
        usuario.email_usuario = usuarioCrear.email;
        usuario.password_usuario = usuarioCrear.password;
        usuario.fecha_nacimiento_usuario = usuarioCrear.fecha_nacimiento;
        const arregloErrores = await validate(usuario);
        const existeErrores = arregloErrores.length > 0;
        if (existeErrores) {
            console.error('Errores: Usuario a crear - ', arregloErrores);
            throw new BadRequestException('Datos incorrectos');
        } else {
            await this._usuarioService.crearUsuario(usuario);
            response.redirect('login');
        }

    }


    @Get('buscar')
    async buscar(
        @Query('busqueda') busqueda: string,
    ) {
        let usuarios: UsuarioEntity[];
        if (busqueda) {
            const consulta: FindManyOptions<UsuarioEntity> = {
                where: [
                    {
                        titulo: Like(`%${busqueda}%`)
                    },
                    {
                        descripcion: Like(`%${busqueda}%`)
                    }
                ]
            };
            usuarios = await this._usuarioService.buscar(consulta);
        } else {
            usuarios = await this._usuarioService.buscar();
        }

    }





}