// src/app/cursos/services/curso.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importamos HttpClient
import { Observable } from 'rxjs'; // Necesitamos Observable para las operaciones HTTP

export interface Curso {
  id?: string; // mockapi.io añade un ID, lo hacemos opcional para crear
  nombre: string;
  duracion: string;
  nivel: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'https://683f2faf1cd60dca33de9085.mockapi.io/v1/cursos'; // Tu endpoint de cursos en mockapi.io

  constructor(private http: HttpClient) { }

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  agregarCurso(curso: Omit<Curso, 'id'>): Observable<Curso> { // Agregamos Omit para que no esperes 'id' al crear
    // Cuando agregas, mockapi.io te devuelve el objeto creado con su ID
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  // Ahora editamos por ID, no por índice
  editarCurso(id: string, curso: Curso): Observable<Curso> {
    // mockapi.io espera un PUT al recurso específico por ID
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso); // <<-- ¡CORRECCIÓN AQUÍ!
  }

  // Ahora eliminamos por ID, no por índice
  eliminarCurso(id: string): Observable<void> {
    // mockapi.io espera un DELETE al recurso específico por ID
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // <<-- ¡CORRECCIÓN AQUÍ!
  }

  // Opcional: Si necesitas obtener un solo curso por ID
  obtenerCursoPorId(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`); // <<-- ¡CORRECCIÓN AQUÍ!
  }
}