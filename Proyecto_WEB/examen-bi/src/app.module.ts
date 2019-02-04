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
import { AutorModule } from './autor/autor.module';
import { LibroModule } from './libro/libro.module';
import { EventoModule } from './evento/evento.module';
import { EventoLibroModule } from './evento-libro/evento-libro.module';
import { AutorEntity } from './autor/autor.entity';
import { LibroEntity } from './libro/libro.entity';
import { EventoEntity } from './evento/evento.entity';
import { EventoLibroEntity } from './evento-libro/evento-libro.entity';



@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port:  32769,
          username: 'web',
          password: '123',
          database: 'web',
          // BDD Ya existe -> syrsnchronized: false
          synchronize: true,
          //dropSchema: true, //borra la base y se vuelve a crear, buena idea para pruebas pero no para produccion
          entities: [
              RolEntity,
              UsuarioEntity,
              RolPorUsuarioEntity,
              AutorEntity,
              LibroEntity,
              EventoEntity,
              EventoLibroEntity
          ],
      }),
      UsuarioModule,
      RolPorUsuarioModule,
      RolModule,
      AutorModule,
      LibroModule,
      EventoModule,
      EventoLibroModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
