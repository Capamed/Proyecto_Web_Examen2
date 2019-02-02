import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { PeliculaEntity } from "src/pelicula/pelicula.entity";
import { EventoPeliculaEntity } from "src/evento-pelicula/evento.entity";

@Entity('evento')
export class EventoEntity{
    
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({type: 'varchar', length:40})
    nombre?: string;
    
    @Column({type: 'varchar', length:10})
    fecha?: string;
    
    @Column({type: 'decimal'})
    latitud?: number;

    @Column({type: 'decimal'})
    longitud?: number;

    @OneToMany(type => EventoPeliculaEntity, eventoPelicula => eventoPelicula.id)
    eventoPelicula: EventoPeliculaEntity[];


}