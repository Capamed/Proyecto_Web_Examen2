import { Controller, Get, Res, Post, Session, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { CredencialesDto } from './dto/credenciales.dto';
import { validate } from 'class-validator';
import { UsuarioService } from './usuario/usuario.service';
import { RolPorUsuarioService } from './rol-por-usuario/rol-por-usuario.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly _usuarioService: UsuarioService,
              private readonly _rolPorUsuarioService :RolPorUsuarioService) {}


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
                      response.redirect('/usuario/crear-usuario')
                          break;
                      case 'administrador':
                      response.redirect('/usuario/inicio')
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

}
