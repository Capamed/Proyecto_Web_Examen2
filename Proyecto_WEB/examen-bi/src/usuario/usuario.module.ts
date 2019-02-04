import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import { RolesService } from "./guards";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([UsuarioEntity])
        ],
        providers:[
            UsuarioService,
            RolesService
        ],
        controllers:[UsuarioController],
        exports:[UsuarioService],
    }
)
export class UsuarioModule {

}