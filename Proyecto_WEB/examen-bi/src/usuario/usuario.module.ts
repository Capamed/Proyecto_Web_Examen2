import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import { RolesService } from "./guards";
import { RolPorUsuarioService } from "src/rol-por-usuario/rol-por-usuario.service";
import { RolPorUsuarioModule } from "src/rol-por-usuario/rol-por-usuario.module";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([UsuarioEntity]),
            RolPorUsuarioModule
        ],
        providers:[
            UsuarioService,
            RolesService,
        ],
        controllers:[UsuarioController],
        exports:[UsuarioService],
    }
)
export class UsuarioModule {

}