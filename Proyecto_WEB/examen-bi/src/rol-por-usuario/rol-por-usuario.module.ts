import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolService} from "../rol/rol.service";
import {RolController} from "../rol/rol.controller";
import {RolPorUsuarioEntity} from "./rol-por-usuario.entity";
import {RolPorUsuarioService} from "./rol-por-usuario.service";
import {RolPorUsuarioController} from "./rol-por-usuario.controller";
import { UsuarioService } from "src/usuario/usuario.service";
import { UsuarioModule } from "src/usuario/usuario.module";
import { RolModule } from "src/rol/rol.module";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
            [RolPorUsuarioEntity]),UsuarioModule,RolModule
        ],
        providers:[RolPorUsuarioService,RolService],
        controllers:[RolPorUsuarioController],
        exports:[RolPorUsuarioService]
    }
)
export class RolPorUsuarioModule {

}