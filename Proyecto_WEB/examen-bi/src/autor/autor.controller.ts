import { Controller, Get, Param, Post, Body, Delete, Req } from "@nestjs/common";
import { AutorService } from "./autor.service";
import { AutorCreateDto } from "./autor-create-dto/autor-create.dto";
import { AutorUpdateDto } from "./autor-update-dto/autor-update.dto";

@Controller('autor')

export class AutorController {

    constructor(
        private readonly _autorService: AutorService
    ) { }
 
    @Get('buscar')
    findAll() {
        return this._autorService.findAll();
    }
 
    @Get('buscarPorId/:id')
    findOne(
        @Param('id') id
    ) {
        return this._autorService.findOne(id);
    }

    @Post('crear')
    create(
        @Body() autorCrear: AutorCreateDto
    ) {
        return this._autorService.create(autorCrear)
    }

    @Delete('eliminar/:id')
    eliminarUno(
        @Req() req
    ) {
        return this._autorService.delete(req.params.id)
    }
 
    @Post('editar/:id')
    editarUno(
        @Param('id') idAutor,
        @Body() autorEditar: AutorUpdateDto
    ) { 
        return this._autorService.update(idAutor, autorEditar)    
    }
}
