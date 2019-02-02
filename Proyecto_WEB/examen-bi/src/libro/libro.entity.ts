import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { AutorEntity } from "src/autor/autor.entity";
import { EventoLibroEntity } from "src/evento-libro/evento.entity";

@Entity('libro')
export class LibroEntity{
    
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({type: 'varchar', length:40})
    nombre?: string;
    
    @Column({type: 'int'})
    anioLanzamiento?: number;
    
    @Column({type: 'int'})
    rating?: number;

    @Column({type: 'varchar'})
    actoresPrincipales?: string;

    @Column({type: 'varchar'})
    sinopsis?: string;

    @ManyToOne(type => AutorEntity, autor => autor.id, {eager: true})
    autor: AutorEntity;

    @OneToMany(type => EventoLibroEntity, eventoLibro => eventoLibro.id)
    eventoLibro: EventoLibroEntity[];

}
