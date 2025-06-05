// src/app/cursos/services/curso.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Curso {
  id?: string; // mockapi.io añade un ID, lo hacemos opcional para crear
  nombre: string;
  duracion: number; // ✅ CAMBIO: Ahora es number
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

  agregarCurso(curso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  editarCurso(id: string, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  eliminarCurso(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerCursoPorId(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }
}