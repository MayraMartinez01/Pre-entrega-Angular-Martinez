// src/app/alumnos/services/alumno.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // ✅ Importa 'of' para Observables simulados

export interface Alumno { // ✅ Asegúrate de que esta interfaz se exporte
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  fechaRegistro: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnos: Alumno[] = [
    { id: '1', nombre: 'Ana', apellido: 'Pérez', email: 'ana@example.com', fechaRegistro: '2023-01-14' },
    { id: '2', nombre: 'Luis', apellido: 'Gómez', email: 'luis@example.com', fechaRegistro: '2023-02-19' },
    { id: '3', nombre: 'Carla', apellido: 'Ruiz', email: 'carla@example.com', fechaRegistro: '2023-03-09' }
  ];

  constructor() { }

  getAlumnos(): Observable<Alumno[]> {
    return of(this.alumnos);
  }

  addAlumno(alumno: Alumno): Observable<Alumno> {
    const newId = (this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => Number(a.id))) + 1 : 1).toString();
    const newAlumno = { ...alumno, id: newId };
    this.alumnos.push(newAlumno);
    return of(newAlumno);
  }

  // ✅ CORRECCIÓN CLAVE: updateAlumno espera un solo argumento: el objeto Alumno completo y actualizado
  updateAlumno(alumnoActualizado: Alumno): Observable<void> {
    const index = this.alumnos.findIndex(a => a.id === alumnoActualizado.id);
    if (index > -1) {
      this.alumnos[index] = alumnoActualizado;
    }
    return of(void 0); // Retorna un Observable vacío para simular éxito
  }

  deleteAlumno(id: string): Observable<void> {
    this.alumnos = this.alumnos.filter(a => a.id !== id);
    return of(void 0); // Retorna un Observable vacío para simular éxito
  }
}