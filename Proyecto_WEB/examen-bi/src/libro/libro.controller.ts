import { Controller, Get, Param, Post, Body, Delete, Req, BadRequestException, Put } from "@nestjs/common";
import { LibroService } from "./libro.service";
import { LibroCreateDto } from "./libro-create-dto/libro-create.dto";
import { LibroUpdateDto } from "./libro-update-dto/libro-update.dto";


@Controller('libro')

export class LibroController {

    constructor(
        private readonly _libroService: LibroService
    ) { }
 
    @Get('buscar')
    findAll() {
        return this._libroService.findAll();
    }
 
    @Get('buscarPorId/:id')
    findOne(
        @Param('id') id
    ) {
        return this._libroService.findOne(id);
    }

    @Post('crear')
    create(
        @Body() libroCrear: LibroCreateDto
    ) {
        return this._libroService.create(libroCrear)
    }

    @Delete('eliminar/:id')
    eliminarUno(
        @Req() req
    ) {
        return this._libroService.delete(req.params.id)
    }
 
    @Post('editar/:id')
    editarUno(
        @Param('id') idLibro,
        @Body() libroEditar: LibroUpdateDto
    ) { 
        return this._libroService.update(idLibro, libroEditar)    
    }
}
