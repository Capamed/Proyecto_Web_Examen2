import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolPorUsuarioService} from "../rol-por-usuario/rol-por-usuario.service";
import {RolPorUsuarioEntity} from "../rol-por-usuario/rol-por-usuario.entity";

@Entity('usuario')

export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column(
        {
        name:'nombre_usuario',
        type:'varchar',
        length:30,
        default:'nombre',
        }
        )
    name:string;

    @Column(
        {
            name:'email_usuario',
            type:'varchar',
            length:30,
            default:'email',
        }
    )
    email:string;

    @Column(
        {
            name:'password_usuario',
            type:'varchar',
            length:30,
            default:'1234',
        }
    )
    password:string;


    @Column(
        {
            name:'fecha_nacimiento_usuario',
            type:'varchar',
            default:'1/1/1995',
        }
    )
    fecha_nacimiento:string;


    @OneToMany(
        type => RolPorUsuarioEntity,
        rolPorUsuario =>rolPorUsuario.usuario
    )
    rolesPorUsuario : RolPorUsuarioEntity[];
}