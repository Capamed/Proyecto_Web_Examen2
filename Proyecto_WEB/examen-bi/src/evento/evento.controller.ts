import { Controller, Get, Param, Post, Body, Delete, Req, Res } from "@nestjs/common";

import { EventoService } from "./evento.service";

@Controller('evento')

export class EventoController {

    constructor(
        private readonly _eventoService: EventoService
    ) { }
 
    @Get('crear-evento')
    mostrarCrearEvento(
        @Res() response
){
        response.render('crear-evento')
}

@Post('crear-evento')
   async  metodoCrearEvento(
        @Res() response,
        @Body() evento:EventoInterface,
){
        await this._eventoService.crear(evento);
    const parametrosConsulta = `?accion=crear&nombre=${evento.nombreEvento}`;

    response.redirect('/autor/autor' + parametrosConsulta)

}
}


export interface EventoInterface{
    nombreEvento: string
    fechaEvento: Date
    longitud: number
    latitud: number
}