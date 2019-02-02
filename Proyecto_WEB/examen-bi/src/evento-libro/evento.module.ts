import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventoLibroEntity } from "./evento.entity";
import { EventoLibroService } from "./evento.service";
import { EventoLibroController } from "./evento.controller";


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
