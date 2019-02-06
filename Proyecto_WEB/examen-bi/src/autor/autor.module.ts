import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutorController } from "./autor.controller";
import { AutorEntity } from "./autor.entity";
import { AutorService } from "./autor.service";
import { EventoModule } from "src/evento/evento.module";

@Module({
    imports: [TypeOrmModule.forFeature([
        AutorEntity
    ]),EventoModule],
    providers: [AutorService],
    controllers: [AutorController],
    exports: [AutorService],
})

export class AutorModule {

} 
