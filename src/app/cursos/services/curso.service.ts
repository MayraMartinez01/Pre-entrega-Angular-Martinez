import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursos = [
    { nombre: 'Angular', duracion: '2 meses', nivel: 'Intermedio' },
    { nombre: 'React', duracion: '1.5 meses', nivel: 'Principiante' }
  ];

  constructor() {}

  obtenerCursos(): Observable<any[]> {
    return of(this.cursos);
  }
}
