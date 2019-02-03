import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { EventoEntity } from "src/evento/evento.entity";
import { LibroEntity } from "src/libro/libro.entity";

@Entity('evento_libro')
export class EventoLibroEntity{
    
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(
        type => LibroEntity, 
        libro => libro.eventosLibro, {eager: true}
    )
    libro: LibroEntity;

    @ManyToOne(
        type => EventoEntity, 
        evento => evento.eventosLibros, {eager: true}
    )
    evento: EventoEntity;
}