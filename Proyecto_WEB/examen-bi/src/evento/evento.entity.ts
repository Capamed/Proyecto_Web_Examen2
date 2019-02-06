import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { EventoLibroEntity } from "src/evento-libro/evento-libro.entity";

@Entity('evento')
export class EventoEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "nombre_evento",
        type: "varchar",
        length: 40
    })
    nombreEvento: string;

    @Column({
        name: "fecha_evento",
        type: "date",
    })
    fechaEvento: Date;

    @Column({
        name: "latitud",
        type: "decimal",
    })
    latitud: number;

    @Column({
        name: "longitud",
        type: "decimal",
    })
    longitud: number;
    
   longitud_evento
    @OneToMany(
        type => EventoLibroEntity,
        eventoLibro => eventoLibro.evento
    )
    eventosLibros: EventoLibroEntity[];


}