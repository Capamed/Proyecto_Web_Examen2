import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventoEntity } from "./evento.entity";
import { EventoService } from "./evento.service";
import { EventoController } from "./evento.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        EventoEntity
    ])],
    providers: [EventoService],
    controllers: [EventoController],
    exports: [EventoService],
})

export class EventoModule {

} 
