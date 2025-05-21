import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Alumno {
  nombre: string;
  curso: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnos: Alumno[] = [
    { nombre: 'Ana Pérez', curso: 'Angular', email: 'ana@example.com' },
    { nombre: 'Luis Gómez', curso: 'React', email: 'luis@example.com' },
    { nombre: 'Carla Ruiz', curso: 'Vue', email: 'carla@example.com' }
  ];

  obtenerAlumnos(): Observable<Alumno[]> {
    return of(this.alumnos);
  }

  agregarAlumno(alumno: Alumno): Observable<Alumno[]> {
    this.alumnos.push(alumno);
    return of(this.alumnos);
  }

  eliminarAlumno(index: number): Observable<Alumno[]> {
    this.alumnos.splice(index, 1);
    return of(this.alumnos);
  }

  editarAlumno(index: number, alumno: Alumno): Observable<Alumno[]> {
    this.alumnos[index] = alumno;
    return of(this.alumnos);
  }
}