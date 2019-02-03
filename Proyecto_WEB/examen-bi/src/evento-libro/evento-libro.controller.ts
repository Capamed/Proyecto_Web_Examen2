import { Controller, Get, Param, Post, Body, Delete, Req } from "@nestjs/common";
import { EventoLibroService } from "./evento-libro.service";
import { EventoLibroCreateDto } from "./evento-libro-create-dto/evento-libro-create.dto";
import { EventoLibroUpdateDto } from "./evento-libro-update-dto/evento-libro-update.dto";

@Controller('evento-libro')

export class EventoLibroController {

    constructor(
        private readonly _eventoLibroService: EventoLibroService
    ) { }
 
    @Get('buscar')
    findAll() {
        return this._eventoLibroService.findAll();
    }
 
    @Get('buscarPorId/:id')
    findOne(
        @Param('id') id
    ) {
        return this._eventoLibroService.findOne(id);
    }

    @Post('crear')
    create(
        @Body() eventoLibroCrear: EventoLibroCreateDto
    ) {
        return this._eventoLibroService.create(eventoLibroCrear);
    }

    @Delete('eliminar/:id')
    eliminarUno(
        @Req() req
    ) {
        return this._eventoLibroService.delete(req.params.id);
    }
 
    @Post('editar/:id')
    editarUno(
        @Param('id') idEventoLibro,
        @Body() eventoLibroEditar: EventoLibroUpdateDto
    ) { 
        return this._eventoLibroService.update(idEventoLibro, eventoLibroEditar);
    }
}
