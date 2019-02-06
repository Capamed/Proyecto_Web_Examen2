import { Controller, Get, Param, Post, Body, Res, Query} from "@nestjs/common";
import { LibroService } from "./libro.service";
import { AutorEntity } from "src/autor/autor.entity";
import { Like, FindManyOptions } from "typeorm";
import { LibroEntity } from "./libro.entity";
import { LibroCreateDto } from "src/dto/libro.dto";



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
    crearMedicamento(
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

        libroValidacion.isbn_libro = libro.isbn_libro
        libroValidacion.nombre_libro = libro.nombre_libro
        
        libroValidacion.composicion = libro.composicion
        libroValidacion.usadoPara = libro.usadoPara

        const fec = new Date(libro.fechaCaducidad).toISOString();
        libroValidacion.fechaCaducidad = fec

        libro.numeroPastillas = Number(libro.numeroPastillas)
        libroValidacion.numeroPastillas = libro.numeroPastillas

        const errores: ValidationError[] =
            await validate(libroValidacion);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);

            const parametrosConsulta = `?error=${errores[0].constraints}`;

            response.redirect('/libro/crear-libro/' + idAutor + parametrosConsulta)
        } else {

            await this._libroService.crear(libro);

            const parametrosConsulta = `?accion=crear&nombre=${libro.nombreMedicamento}`;

            response.redirect('/medicamento/inicio/' + idAutor + parametrosConsulta)
        }
    }

    //BORRAR USUARIO

    @Post('borrar/:idAutor/:idMedicamento/')
    async borrar(
        @Param('idMedicamento') idMedicamento: string,
        @Param('idAutor') idAutor: string,
        @Res() response
    ) {
        const medicamentoEncontrado = await this._medicamentoService
            .buscarPorId(+idMedicamento);

        await this._medicamentoService.borrar(Number(idMedicamento));

        const parametrosConsulta = `?accion=borrar&nombre=${medicamentoEncontrado.nombreMedicamento}`;

        response.redirect('/medicamento/inicio/' + idAutor + parametrosConsulta);
    }

    /////actualizar datos del usuario

    @Get('actualizar-medicamento/:idAutor/:idMedicamento')
    async actualizarMedicamento(
        @Param('idMedicamento') idMedicamento: string,
        @Param('idAutor') idAutor: string,
        @Res() response,
        @Query('error') error: string
    ) {
        let mensaje = undefined;

        if(error){
            mensaje = "Datos erroneos";
        }

        const medicamentoActualizar = await this._medicamentoService
            .buscarPorId(Number(idMedicamento));

        response.render(
            'crear-medicamento', {//ir a la pantalla de crear-usuario
                medicamento: medicamentoActualizar,
                idAutor: idAutor,
                idMedicamento: idMedicamento,
                mensaje: mensaje
            }
        )
    }

    @Post('actualizar-medicamento/:idAutor/:idMedicamento')
    async actualizarMedicamentoFormulario(
        @Param('idMedicamento') idMedicamento: string,
        @Param('idAutor') idAutor: string,
        @Res() response,
        @Body() medicamento: Medicamento
    ) {

        let mensaje = undefined;

        const objetoValidacionMedicamento = new medicamentoDto();

        medicamento.gramosAIngerir = Number(medicamento.gramosAIngerir)
        objetoValidacionMedicamento.gramosAIngerir = medicamento.gramosAIngerir
        objetoValidacionMedicamento.nombreMedicamento = medicamento.nombreMedicamento
        objetoValidacionMedicamento.composicion = medicamento.composicion
        objetoValidacionMedicamento.usadoPara = medicamento.usadoPara
        const fec = new Date(medicamento.fechaCaducidad).toISOString();
        objetoValidacionMedicamento.fechaCaducidad = fec

        medicamento.numeroPastillas = Number(medicamento.numeroPastillas)
        objetoValidacionMedicamento.numeroPastillas = medicamento.numeroPastillas

        const errores: ValidationError[] =
            await validate(objetoValidacionMedicamento);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);

            const parametrosConsulta = `?error=${errores[0].constraints}`;

            response.redirect('/medicamento/actualizar-medicamento/' + idAutor +"/"+ idMedicamento +  parametrosConsulta)

        } else {

            medicamento.id = +idMedicamento;

            await this._medicamentoService.actualizar(+idMedicamento, medicamento);

            const parametrosConsulta = `?accion=actualizar&nombre=${medicamento.nombreMedicamento}`;


            response.redirect('/medicamento/inicio/' + idAutor + parametrosConsulta);

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