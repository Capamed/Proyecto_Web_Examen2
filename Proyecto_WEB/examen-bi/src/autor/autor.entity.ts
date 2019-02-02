import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { LibroEntity } from "src/libro/libro.entity";

@Entity('autor')
export class AutorEntity{
    
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({type: 'varchar', length:40})
    nombres: string;
    
    @Column({type: 'varchar', length:40})
    apellidos: string;
    
    @Column({type: 'varchar', length:10})
    fechaNacimiento?: string;

    @Column({type: 'int'})
    numeroPeliculas?: number;

    @Column({type: 'boolean'})
    retirado: boolean;

    @OneToMany(type => LibroEntity, libro => libro.id)
    libro: LibroEntity[];

}