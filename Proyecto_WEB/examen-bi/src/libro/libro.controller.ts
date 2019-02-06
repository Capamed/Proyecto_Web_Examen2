import { Controller, Get, Param, Post, Body, Res, Query} from "@nestjs/common";
import { LibroService } from "./libro.service";
import { AutorEntity } from "src/autor/autor.entity";
import { Like, FindManyOptions } from "typeorm";
import { LibroEntity } from "./libro.entity";
import { LibroCreateDto } from "src/dto/libro.dto";
import { ValidationError, validate } from "class-validator";



@Controller('libro')

export class LibroController {

    constructor(
        private readonly _libroService: LibroService
    ) { }
 
    @Get('inicio/:idAutor')
    async mostrarLibro(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busquedaLibro') busquedaLibro: string,
        @Param('idAutor') idAutor: string,
    ) {
        let mensaje = undefined;

        console.log(busquedaLibro);


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


        let libros: LibroEntity[];


        let libroUsuario: LibroEntity[];


        if (busquedaLibro) {

            const consulta: FindManyOptions<LibroEntity> = {
                where: [
                    {
                        //paciente: idPaciente,
                        nombreLibro: Like(`%${busquedaLibro}%`)
                    }

                ]
            };
            libroUsuario = await this._libroService.buscar(consulta);
            console.log(libroUsuario)
        } else {

            libroUsuario = await this._libroService.buscarPorIdAutor(Number(idAutor));

        }

        response.render('tabla-libros',
            {
                arregloLibros: libroUsuario,
                mensaje: mensaje,
                idAutor: idAutor
            }
        )
    }


    //se inicializa la pantalla de crear medicamento
    @Get('crear-libro/:idAutor')
    crearLibro(
        @Res() response,
        @Param('idAutor') idAutor: string,
        @Query('error') error: string
    ) {
        let mensaje = undefined;

        if(error){
            mensaje = "Datos erroneos";
        }

        response.render(
            'crear-libro',
            {
                idAutor: idAutor,
                mensaje: mensaje
            }
        )
    }

//CREAR USUARIO Y GUARDAR EN LA BASE DE DATOS
    @Post('crear-libro/:idAutor')
    async crearLibroFuncion(
        @Res() response,
        @Body() libro: LibroInterface,
        @Param('idAutor') idAutor: string
    ) {

        let mensaje = undefined;

        const libroValidacion = new LibroCreateDto();

        libro.isbn_libro = Number(libro.isbn_libro)
        libroValidacion.isbn_libro = libro.isbn_libro
        
        libroValidacion.nombre_libro = libro.nombre_libro

        libro.numero_paginas = Number(libro.numero_paginas)
        libroValidacion.numero_paginas = libro.numero_paginas

        libro.edicion = Number(libro.edicion)
        libroValidacion.edicion = libro.edicion

        const fec = new Date(libro.fecha_publicacion).toISOString();
        libroValidacion.fecha_publicacion = fec

        
        const errores: ValidationError[] =
            await validate(libroValidacion);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);

            const parametrosConsulta = `?error=${errores[0].constraints}`;

            response.redirect('/libro/crear-libro/' + idAutor + parametrosConsulta)
        } else {

            await this._libroService.crear(libro);

            const parametrosConsulta = `?accion=crear&nombre=${libro.nombre_libro}`;

            response.redirect('/libro/inicio/' + idAutor + parametrosConsulta)
        }
    }

    //BORRAR USUARIO

    @Post('borrar/:idAutor/:idLibro/')
    async borrar(
        @Param('idLibro') idLibro: string,
        @Param('idAutor') idAutor: string,
        @Res() response
    ) {
        const libroEncontrado = await this._libroService
            .buscarPorId(+idLibro);

        await this._libroService.borrar(Number(idLibro));

        const parametrosConsulta = `?accion=borrar&nombre=${libroEncontrado.nombre_libro}`;

        response.redirect('/libro/inicio/' + idAutor + parametrosConsulta);
    }

    /////actualizar datos del usuario

    @Get('actualizar-libro/:idAutor/:idLibro')
    async actualizarLibro(
        @Param('idLibro') idLibro: string,
        @Param('idAutor') idAutor: string,
        @Res() response,
        @Query('error') error: string
    ) {
        let mensaje = undefined;

        if(error){
            mensaje = "Datos erroneos";
        }

        const libroActualizar = await this._libroService
            .buscarPorId(Number(idLibro));

        response.render(
            'crear-libro', {//ir a la pantalla de crear-usuario
                libro: libroActualizar,
                idAutor: idAutor,
                idLibro: idLibro,
                mensaje: mensaje
            }
        )
    }

    @Post('actualizar-libro/:idAutor/:idLibro')
    async actualizarLibroFormulario(
        @Param('idLibro') idLibro: string,
        @Param('idAutor') idAutor: string,
        @Res() response,
        @Body() libro: LibroInterface
    ) {

        let mensaje = undefined;
        const libroValidacion = new LibroCreateDto();

        libro.isbn_libro = Number(libro.isbn_libro)
        libroValidacion.isbn_libro = libro.isbn_libro
        
        libroValidacion.nombre_libro = libro.nombre_libro

        libro.numero_paginas = Number(libro.numero_paginas)
        libroValidacion.numero_paginas = libro.numero_paginas

        libroValidacion.edicion = libro.edicion

        const fec = new Date(libro.fecha_publicacion).toISOString();
        libroValidacion.fecha_publicacion = fec

        const errores: ValidationError[] =
            await validate(libroValidacion);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);

            const parametrosConsulta = `?error=${errores[0].constraints}`;

            response.redirect('/libro/actualizar-libro/' + idAutor +"/"+ idLibro +  parametrosConsulta)

        } else {

            libro.id = +idLibro;

            await this._libroService.actualizar(+idLibro, libro);

            const parametrosConsulta = `?accion=actualizar&nombre=${libro.nombre_libro}`;


            response.redirect('/libro/inicio/' + idAutor + parametrosConsulta);

        }

    }
}
export interface LibroInterface {
    id?: number;
    isbn_libro: number;
    nombre_libro: string;
    numero_paginas: number;
    edicion: number;
    fecha_publicacion: Date;
    nombre_editorial: string;
    autor: AutorEntity;
  }