import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutorController } from "./autor.controller";
import { AutorEntity } from "./autor.entity";
import { AutorService } from "./autor.service";

@Module({
    imports: [TypeOrmModule.forFeature([
        AutorEntity
    ])],
    providers: [AutorService],
    controllers: [AutorController],
    exports: [AutorService],
})

export class AutorModule {

} 
