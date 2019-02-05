import { Controller, Get, Post, Res, Body, BadRequestException, Query ,Session, Param} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto } from "src/dto/usuario.dto";
import { validate } from "class-validator";
import { UsuarioEntity } from "./usuario.entity";
import { FindManyOptions, Like } from "typeorm";



@Controller('usuario')

export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService
    ) {
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
            response.redirect('/login');
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