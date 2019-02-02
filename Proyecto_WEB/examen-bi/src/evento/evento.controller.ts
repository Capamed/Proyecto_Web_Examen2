import { Controller, Get, Param, Post, Body, Delete, Req } from "@nestjs/common";
import { EventoCreateDto } from "src/actor/actor-create-dto/actor-create.dto";
import { EventoUpdateDto } from "./evento-update-dto/evento-update.dto";
import { EventoService } from "./evento.service";


@Controller('evento')

export class EventoController {

    constructor(
        private readonly _eventoService: EventoService
    ) { }
 
    @Get('buscar')
    findAll() {
        return this._eventoService.findAll();
    }
 
    @Get('buscarPorId/:id')
    findOne(
        @Param('id') id
    ) {
        return this._eventoService.findOne(id);
    }

    @Post('crear')
    create(
        @Body() eventoCrear: EventoCreateDto
    ) {
        return this._eventoService.create(eventoCrear);
    }

    @Delete('eliminar/:id')
    eliminarUno(
        @Req() req
    ) {
        return this._eventoService.delete(req.params.id);
    }
 
    @Post('editar/:id')
    editarUno(
        @Param('id') idEvento,
        @Body() eventoEditar: EventoUpdateDto
    ) { 
        return this._eventoService.update(idEvento, eventoEditar);
    }
}
