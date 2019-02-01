import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolService} from "../rol/rol.service";
import {RolController} from "../rol/rol.controller";
import {RolPorUsuarioEntity} from "./rol-por-usuario.entity";
import {RolPorUsuarioService} from "./rol-por-usuario.service";
import {RolPorUsuarioController} from "./rol-por-usuario.controller";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
            [RolPorUsuarioEntity]
        )
        ],
        providers:[RolPorUsuarioService],
        controllers:[RolPorUsuarioController],
        exports:[RolPorUsuarioService]
    }
)
export class RolPorUsuarioModule {

}