import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Curso {
  nombre: string;
  duracion: string;
  nivel: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursos: Curso[] = [
    { nombre: 'Angular', duracion: '2 meses', nivel: 'Intermedio' },
    { nombre: 'React', duracion: '1.5 meses', nivel: 'Principiante' }
  ];

  obtenerCursos(): Observable<Curso[]> {
    return of(this.cursos);
  }

  agregarCurso(curso: Curso): Observable<Curso[]> {
    this.cursos.push(curso);
    return of(this.cursos);
  }

  eliminarCurso(index: number): Observable<Curso[]> {
    this.cursos.splice(index, 1);
    return of(this.cursos);
  }

  editarCurso(index: number, curso: Curso): Observable<Curso[]> {
    this.cursos[index] = curso;
    return of(this.cursos);
  }
}