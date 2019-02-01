import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolEntity} from "./rol/rol.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {RolPorUsuarioEntity} from "./rol-por-usuario/rol-por-usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {RolPorUsuarioModule} from "./rol-por-usuario/rol-por-usuario.module";
import {RolModule} from "./rol/rol.module";


@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 32769,
          username: 'root',
          password: 'root',
          database: 'cualquiera',
          // BDD Ya existe -> synchronized: false
          synchronize: true,
          //dropSchema: true, //borra la base y se vuelve a crear, buena idea para pruebas pero no para produccion
          entities: [
              RolEntity,
              UsuarioEntity,
              RolPorUsuarioEntity,
          ],
      }),
      UsuarioModule,
      RolPorUsuarioModule,
      RolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
