import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventoLibroService } from "./evento-libro.service";
import { EventoLibroEntity } from "./evento-libro.entity";
import { EventoLibroController } from "./evento-libro.controller";



@Module({
    imports: [TypeOrmModule.forFeature([
        EventoLibroEntity
    ])],
    providers: [EventoLibroService],
    controllers: [EventoLibroController],
    exports: [EventoLibroService],
})

export class EventoLibroModule {

} 
