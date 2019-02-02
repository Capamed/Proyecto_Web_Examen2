import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { EventoEntity } from "src/evento/evento.entity";
import { LibroEntity } from "src/libro/libro.entity";

@Entity('evento-libro')
export class EventoLibroEntity{
    
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => LibroEntity, libro => libro.id, {eager: true})
    libro: LibroEntity;

    @ManyToOne(type => EventoEntity, evento => evento.id, {eager: true})
    evento: EventoEntity;

}