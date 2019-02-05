import { AutorInterface } from '../autor/autor.interface';

export interface LibroInterface {
  id?: number;
  isbn: number;
  nombre: string;
  numeroPaginas: number;
  edicion: number;
  fechaPublicacion: Date;
  nombreEditorial: string;
  autor: AutorInterface;
}