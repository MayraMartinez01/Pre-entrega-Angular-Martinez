import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Inscripcion {
  alumno: string;
  curso: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private inscripciones: Inscripcion[] = [
    { alumno: 'Ana Pérez', curso: 'Angular', fecha: '2024-09-01' },
    { alumno: 'Luis Gómez', curso: 'React', fecha: '2024-09-02' }
  ];

  obtenerInscripciones(): Observable<Inscripcion[]> {
    return of(this.inscripciones);
  }

  agregarInscripcion(inscripcion: Inscripcion): Observable<Inscripcion[]> {
    this.inscripciones.push(inscripcion);
    return of(this.inscripciones);
  }

  eliminarInscripcion(index: number): Observable<Inscripcion[]> {
    this.inscripciones.splice(index, 1);
    return of(this.inscripciones);
  }

  editarInscripcion(index: number, inscripcion: Inscripcion): Observable<Inscripcion[]> {
    this.inscripciones[index] = inscripcion;
    return of(this.inscripciones);
  }
}
