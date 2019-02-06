import { Controller, Get, Res, Post, Session, Body, BadRequestException, Param, Query } from '@nestjs/common';
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
      @Query('error')error,

  ) {
    let mensaje = undefined;

    if(error){
        mensaje = "Datos erroneos";
    }

    response.render('login',{
        mensaje:mensaje
    })
  }

  @Post('credenciales')
  async metodoCrendenciales(
      @Res() response,
      @Session() session,
      @Body('email_usuario') username_email,
      @Body('password') password,
  ) {
      console.log(username_email, password)
      const usuario = new CredencialesDto
      usuario.email_usuario = username_email
      usuario.password_usuario = password
      const arregloErrores = await validate(usuario);
      const existeErrores = arregloErrores.length > 0;
      if (existeErrores) {          
        const parametrosConsulta = `?error=${arregloErrores[0].constraints}`;
        response.redirect('/login'+parametrosConsulta)
      } else {
          const respuestaAutenticacion = await this._usuarioService.credenciales(usuario)

          if(respuestaAutenticacion){
              const idUsuario= respuestaAutenticacion.id;
              const rolUsuario = await this._rolPorUsuarioService.verificarRol(+idUsuario)
                 if(rolUsuario){
                     const nombreRol = rolUsuario.rol.rol_nombre
                     session.rol = nombreRol;
                     session.username_email = username_email;
                     session.idUsuario = idUsuario;

                     switch (nombreRol) {
                      case 'usuario':
                      response.redirect('/autor/autor')
                          break;
                      case 'administrador':
                      response.redirect('/usuario/inicio')
                          break;
                      default:
                      response.redirect('login')
                  }
              }else{
                
                response.redirect('login')
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
