import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { AutorEntity } from "src/autor/autor.entity";
import { EventoLibroEntity } from "src/evento-libro/evento-libro.entity";


@Entity('libro')
export class LibroEntity{
    
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column(
        {
            name: 'icbn_libro',
            type: 'int',
        }
    )
    icbn_libro?: number;
    
    @Column(
        {
            name: 'nombre_libro',
            type: 'varchar', 
            length:40
        }
    )
    nombre_libro?: string;
    
    @Column(
        {
            name:'numero_paginas',
            type: 'int',
        }
     )
    numero_paginas?: number;
    
    @Column(
        {
            name:'edicion',
            type: 'int',
        }
    )
    edicion?: number;

    @Column(
        {
            name: 'fecha_publicacion',
            type: 'varchar',
            default:'1/1/1995',
        }
    )
    fecha_publicacion?: string;

    @Column(
        {
            name:'nombre_editorial',
            type: 'varchar',
            length:30
        }
    )
    nombre_editorial?: string;

    @ManyToOne(
        type => AutorEntity, 
        autor => autor.libros, {eager: true}
    )
    autor: AutorEntity;

    @OneToMany(
        type => EventoLibroEntity, 
        eventoLibro => eventoLibro.libro
    )
    eventosLibro: EventoLibroEntity[];

}
