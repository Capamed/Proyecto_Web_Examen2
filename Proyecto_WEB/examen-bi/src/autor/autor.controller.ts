import { Controller, Get, Param, Post, Body, Delete, Req, Res, BadRequestException, Query } from '@nestjs/common';
import { AutorService } from './autor.service';
import { CreateAutorDto } from './autor-create-dto/create-autor.dto';
import { AutorUpdateDto } from './autor-update-dto/autor-update.dto';
import { AutorInterface } from './autor.interface';
import { validate, ValidationError } from 'class-validator';
import { AutorEntity } from './autor.entity';
import { FindManyOptions, Like } from 'typeorm';

@Controller('autor')

export class AutorController {

  constructor(private readonly _autorService: AutorService) {
  }

  @Get('inicio')
  async inicio(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('autor') autor: string,
  ) {

    let mensaje = undefined;
    let clase = undefined;

    if (accion && autor) {
      switch (accion) {
        case 'borrar':
          mensaje = `Registro ${autor} eliminado.`;
          clase = 'alert alert-danger';
          break;

        case 'actualizar':
          mensaje = `Registro ${autor} actualizado.`;
          clase = 'alert alert-info';
          break;

        case 'crear':
          mensaje = `Registro ${autor} creado.`;
          clase = 'alert alert-success';
          break;
      }
    }

    let autores: AutorEntity[];

    if (busqueda) {

      const consulta: FindManyOptions<AutorEntity> = {
        where: [
          {
            nombre_autor: Like(`%${busqueda}%`),
          },
          {
            apellido_autor: Like(`%${busqueda}%`),
          },
        ],
      };

      autores = await this._autorService.findLike(consulta);

    } else {
      autores = await this._autorService.findLike();
    }


    response.render(
      'inicio',
      {
        usuario: 'Adrian',
        arreglo: autores, // AQUI!
        booleano: false,
        mensaje: mensaje,
        clase: clase,
      },
    );
  }


  @Get('crear-autor')
  crearAutorRuta(
    @Res() response,
  ) {
    response.render(
      'crear-autor',
      {
        titulo: 'Registro de Autores',
      },
    );
  }


  @Post('crear-autor')
  async crearAutorFuncion(
    @Res() response,
    @Body() autor: AutorInterface,
  ) {

    const objetoValidacionAutor = new CreateAutorDto();

    objetoValidacionAutor.nombre_autor = autor.nombre_autor;
    objetoValidacionAutor.apellido_autor = autor.apellido_autor;
    objetoValidacionAutor.fecha_nacimiento = autor.fecha_nacimiento;
    objetoValidacionAutor.numero_libros = autor.numero_libros;
    objetoValidacionAutor.ecuatoriano = autor.es_ecuatoriano;

    const errores: ValidationError[] =
      await validate(objetoValidacionAutor);

    const hayErrores = errores.length > 0;

    if (hayErrores) {
      console.error(errores);
      // redirect crear noticia, Y
      // En crear noticia deberian de mostrar mensajes
      // (Como en la pantalla de INICIO)
      throw new BadRequestException({ mensaje: 'Error de validacion' });
    } else {
      const respuesta = await this._autorService.create(autor);

      const parametrosConsulta = `?accion=crear&autor=${autor.nombre_autor}`;

      response.redirect(
        '/autor/inicio' + parametrosConsulta,
      );
    }

  }


  @Get('buscar')
  findAll() {
    return this._autorService.findAll();
  }

  @Get('buscarPorId/:id')
  findOne(
    @Param('id') id,
  ) {
    return this._autorService.findOne(id);
  }

/*
  @Post('crear')
  create(
    @Body() autorCrear: CreateAutorDto,
  ) {
    return this._autorService.create(autorCrear);
  }
*/

  @Delete('eliminar/:id')
  eliminarUno(
    @Req() req,
  ) {
    return this._autorService.delete(req.params.id);
  }

  @Post('editar/:id')
  editarUno(
    @Param('id') idAutor,
    @Body() autorEditar: AutorUpdateDto,
  ) {
    return this._autorService.update(idAutor, autorEditar);
  }
}
