import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InscripcionService {
  private inscripciones = [
    { alumno: 'Ana Pérez', curso: 'Angular', fecha: '2024-09-01' },
    { alumno: 'Luis Gómez', curso: 'React', fecha: '2024-09-02' }
  ];

  obtenerInscripciones(): Observable<any[]> {
    return of(this.inscripciones);
  }
}
