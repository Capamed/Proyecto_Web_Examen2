import { Controller, Get, Param, Post, Body,Res, BadRequestException, Query, Session } from '@nestjs/common';
import { AutorService } from './autor.service';
import { validate, ValidationError } from 'class-validator';
import { AutorEntity } from './autor.entity';
import { FindManyOptions, Like } from 'typeorm';
import { EventoService } from 'src/evento/evento.service';
import { EventoEntity } from 'src/evento/evento.entity';
import { AutorDto } from 'src/dto/autor.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Controller('autor')

export class AutorController {

  constructor(private readonly _autorService: AutorService,
              private readonly _eventoService: EventoService) {
  }

  @Get('autor')
  async autor(
      @Res() response,
      @Query('accion') accion: string,
      @Query('nombre') nombre: string,
      @Query('busqueda') busqueda: string,
      @Session() sesion
  ) {
      console.log(sesion.rol)
      if(sesion.rol==='usuario') {
          let mensaje = undefined;
          console.log(sesion)

          if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    mensaje = `Registro ${nombre} actualizado`;
                    break;
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'crear':
                    mensaje = `Registro ${nombre} creado`;
                    break;
            }
        }


          let autores: AutorEntity[];
          let evento: EventoEntity[]

          if (busqueda) {

              const consulta: FindManyOptions<AutorEntity> = {
                  where: [
                      {
                        nombre_autor: Like(`%${busqueda}%`)
                      },
                      {
                        apellido_autor: Like(`%${busqueda}%`)
                      },
                      {
                        fecha_nacimiento: Like(`%${busqueda}%`)
                      },
                      {
                        numero_libros: Like(`%${busqueda}%`)
                      },
                      {
                        ecuatoriano: Like(`%${busqueda}%`)
                      },
                  ]
              };

              autores = await this._autorService.buscar(consulta);
          } else {

              const consulta: FindManyOptions<AutorEntity> = {
                  where: [{usuario: sesion.idUsuario}]
              }
              autores = await this._autorService.buscar(consulta);
          }

          evento = await this._eventoService.buscar()

          response.render('tabla-autores',
              {
                  arregloAutor: autores,
                  mensaje: mensaje,
              })
      }else{
          throw new BadRequestException({mensaje: "No tiene acceso a esta vista"});
      }
  }

//se inicializa la pantalla de crear usuario
  @Get('crear-Autor')
  crearAutor(
      @Res() response,
      @Session() sesion,
      @Query('error') error: string
  ) {
      let mensaje = undefined;

      if(error){
          mensaje = "Datos erroneos";
      }

      if(sesion.rol === 'usuario'){
          response.render(
              'crear-Autor',{
                  mensaje:mensaje
              }
          )
      }else{
          response.redirect(
              '/login'
          )}
  }

//CREAR USUARIO Y GUARDAR EN LA BASE DE DATOS
  @Post('crear-Autor')
  async crearAutorFuncion(
      @Res() response,
      @Body() autor: AutorInterface,
      @Session() sesion
  ) {

      let mensaje = undefined;
      
      const autorValidacion = new AutorDto();

      autorValidacion.nombre_autor = autor.nombre_autor
      autorValidacion.apellido_autor = autor.apellido_autor

      const fec = new Date(autor.fecha_nacimiento).toISOString();
      autorValidacion.fecha_nacimiento = fec

      autor.numero_libros = Number(autor.numero_libros)
      autorValidacion.numero_libros= autor.numero_libros


      autor.ecuatoriano=Boolean(Number(autor.ecuatoriano));
      autorValidacion.ecuatoriano = autor.ecuatoriano;


      const errores: ValidationError[]=
          await validate(autorValidacion) // Me devuelve un arreglo de validacion de errores

      const hayErrores = errores.length>0;

      if(hayErrores){


          const parametrosConsulta = `?error=${errores[0].constraints}`;

          response.redirect('/autor/crear-Autor/' + parametrosConsulta)
      }else{
          autor.usuario=sesion.idUsuario;
          await this._autorService.crear(autor);


          const parametrosConsulta = `?accion=crear&nombre=${autor.nombre_autor}`;

          response.redirect('/autor/autor' + parametrosConsulta)
      }}


//BORRAR USUARIO

  @Post('borrar/:idAutor')
  async borrar(
      @Param('idAutor') idAutor: string,
      @Res() response
  ) {
      const autorEncontrado = await this._autorService
          .buscarPorId(+idAutor);

      await this._autorService.borrar(Number(idAutor));

      const parametrosConsulta = `?accion=borrar&nombre=${autorEncontrado.nombre_autor}`;

      response.redirect('/autor/autor' + parametrosConsulta);
  }


  /////actualizar datos del usuario

  @Get('actualizar-Autor/:idAutor')
  async actualizarAutor(
      @Param('idAutor') idAutor: string,
      @Res() response,
      @Query('error') error: string
  ) {

      let mensaje = undefined;

      if(error){
          mensaje = "Datos erroneos";
      }

      const usuarioActualizar = await this._autorService
          .buscarPorId(Number(idAutor));

      response.render(
          'crear-Autor', {//ir a la pantalla de crear-usuario
              autor: usuarioActualizar,
              mensaje: mensaje
          }
      )
  }

  @Post('actualizar-Autor/:idAutor')
  async actualizarAutorFormulario(
      @Param('idAutor') idAutor: string,
      @Res() response,
      @Body() autor: AutorInterface
  ) {
      let mensaje = undefined;

      const autorValidacion = new AutorDto();

      autorValidacion.nombre_autor = autor.nombre_autor
      autorValidacion.apellido_autor = autor.apellido_autor

      const fec = new Date(autor.fecha_nacimiento).toISOString();
      autorValidacion.fecha_nacimiento = fec

      autor.numero_libros = Number(autor.numero_libros)
      autorValidacion.numero_libros= autor.numero_libros


      autor.ecuatoriano=Boolean(Number(autor.ecuatoriano));
      autorValidacion.ecuatoriano = autor.ecuatoriano;

      const errores: ValidationError[] = await validate(autorValidacion) // Me devuelve un arreglo de validacion de errores

      const hayErrores = errores.length > 0;

      if (hayErrores) {
          console.error(errores)

          const parametrosConsulta = `?error=${errores[0].constraints}`;

          response.redirect('/autor/actualizar-Autor/'+idAutor + parametrosConsulta)
      } else {
          autor.id = +idAutor;

          await this._autorService.actualizar(+idAutor, autor);

          const parametrosConsulta = `?accion=actualizar&nombre=${autor.nombre_autor}`;

          response.redirect('/autor/autor' + parametrosConsulta);
      }

  }
}

export interface AutorInterface {
  id?: number;
  nombre_autor: string;
  apellido_autor: string;
  fecha_nacimiento?: Date;
  numero_libros?: number;
  ecuatoriano: boolean;
  usuario:UsuarioEntity;
}