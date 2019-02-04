import { Controller, Get, Post, Res, Body, BadRequestException, Query ,Session, Param} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto } from "src/dto/usuario.dto";
import { response } from "express";
import { validate } from "class-validator";
import { UsuarioEntity } from "./usuario.entity";
import { FindManyOptions, Like } from "typeorm";
import { CredencialesDto } from "src/dto/credenciales.dto";
import { RolesService } from "./guards";
import { RolPorUsuarioService } from "src/rol-por-usuario/rol-por-usuario.service";
import { get } from "https";


@Controller('usuario')

export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _rolPorUsuarioService :RolPorUsuarioService,
        
    ) {
    }

    @Get('login')
    credenciales(
        @Res() response,
    ) {
        response.render('login')
    }

    @Post('credenciales')
    async metodoCrendenciales(
        @Res() response,
        @Session() session,
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
            const respuestaAutenticacion = await this._usuarioService.credenciales(usuario)
            if(respuestaAutenticacion){
                const idUsuario= respuestaAutenticacion.id;
                const rolUsuario = await this._rolPorUsuarioService.verificarRol(+idUsuario)
                   if(rolUsuario){
                       const nombreRol = rolUsuario.rol.rol_nombre
                       session.rol = nombreRol;
                       session.username = username;
                       session.idUsuario = idUsuario;

                       switch (nombreRol) {
                        case 'usuario':
                        response.redirect('crear-usuario')
                            break;
                        case 'administrador':
                        response.redirect('inicio')
                            break;
                        default:
                        response.send('Aun no se ha asignado una tarea para este rol')
                    }
                }else{
                throw new BadRequestException({mensaje: 'Espere estamos verificando sus datos'})
       
                }
         }  else{
             response.redirect('login')
         }
        
        }

    }

    @Get('logout')
    async logout(
        @Res() res,
        @Session() sesion,
    )
    {

        sesion.usuario = undefined;
        sesion.destroy()
        res.redirect('login')
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


    @Get('inicio')
    async mostrarUsuario(
        @Res() res,
        @Session() sesion,
        @Query('accion') accion:string,
        @Query('nombre') nombre:string,
        @Query('busqueda') busqueda:string
    ){
        if(sesion.rol==='administrador') {
            let mensaje = undefined;
    
            if (accion && nombre) {
                switch (accion) {
                    case 'actualizar':
                        mensaje = `Rol al usuario ${nombre} actualizado`;
                        break;
                    case 'borrar':
                        mensaje = `Registro ${nombre} eliminado`;
                        break;
                }
            }
    
            let usuarios: UsuarioEntity[];
    
            if (busqueda) {
    
                const consulta: FindManyOptions<UsuarioEntity> = {
                    where: [
                        {
                            nombre_usuario: Like(`%${busqueda}%`)
                        },
                        {
                            email_usuario: Like(`%${busqueda}%`)
                        },
                    ]
                };
    
                usuarios = await this._usuarioService.buscar(consulta);
            } else {
    
                usuarios = await this._usuarioService.buscar();
            }
    
            res.render('tabla-usuarios',
                {
                    arregloUsuario: usuarios,
                    mensaje: mensaje,
    
                })
        }else{
            throw new BadRequestException({mensaje: "No tiene acceso a esta vista"});
        }
    }
    
    
    
    
    
        @Post('borrar/:idUsuario')
        async borrar(
            @Param('idUsuario') idUsuario: string,
            @Res() response
        ) {
            const usuarioEncontrado = await this._usuarioService
                .buscarPorId(+idUsuario);
    
            await this._usuarioService.borrar(Number(idUsuario));
    
            const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrado.nombre_usuario}`;
    
            response.redirect('/usuario/inicio' + parametrosConsulta);
        }








}