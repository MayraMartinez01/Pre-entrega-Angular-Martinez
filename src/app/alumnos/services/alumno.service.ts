import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private alumnos = [
    { nombre: 'Ana Pérez', curso: 'Angular', email: 'ana@example.com' },
    { nombre: 'Luis Gómez', curso: 'React', email: 'luis@example.com' },
    { nombre: 'Carla Ruiz', curso: 'Vue', email: 'carla@example.com' }
  ];

  constructor() {}

  obtenerAlumnos(): Observable<any[]> {
    return of(this.alumnos);
  }
}
