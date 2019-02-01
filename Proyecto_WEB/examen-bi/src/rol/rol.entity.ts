import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolPorUsuarioEntity} from "../rol-por-usuario/rol-por-usuario.entity";

@Entity('rol')

export class RolEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column(
        {
            name:"rol_nombre",
            type:"varchar",
            length:30
        }
    )
    name:string;

    @OneToMany(
        type => RolPorUsuarioEntity,
        rolPorUsuario => rolPorUsuario.rol
    )

    rolesPorUsuario:RolPorUsuarioEntity[];
}