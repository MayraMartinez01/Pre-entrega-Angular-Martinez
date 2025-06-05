// src/app/cursos/lista-cursos/lista-cursos.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // ✅ Importar ReactiveFormsModule, FormBuilder, etc.
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; // ✅ Importar MatTableModule y MatTableDataSource
import { MatCardModule } from '@angular/material/card'; // ✅ Importar MatCardModule
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Si usas íconos
import { MatInputModule } from '@angular/material/input'; // ✅ Importar MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field'; // ✅ Importar MatFormFieldModule

// Asumo que tienes un servicio de cursos y una interfaz Curso
// import { CursoService, Curso } from '../services/curso.service';

interface Curso { // Define la interfaz Curso si no la tienes en un servicio
  id: string;
  nombre: string;
  duracion: string;
  nivel: string;
}

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,        // ✅ Añadir MatTableModule
    MatCardModule,         // ✅ Añadir MatCardModule
    MatButtonModule,
    MatIconModule,         // Si usas MatIcon
    MatInputModule,        // ✅ Añadir MatInputModule
    MatFormFieldModule,    // ✅ Añadir MatFormFieldModule
    ReactiveFormsModule    // ✅ Añadir ReactiveFormsModule
  ],
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {

  // ✅ PROPIEDADES NECESARIAS
  displayedColumns: string[] = ['nombre', 'duracion', 'nivel', 'acciones']; // Ajusta según tus columnas
  dataSource = new MatTableDataSource<Curso>();
  formularioCurso: FormGroup; // ✅ Propiedad del formulario
  editandoCursoId: string | null = null; // ✅ Para saber si estamos editando o agregando

  // Asumo que inyectas un servicio de cursos
  constructor(
    private fb: FormBuilder, // ✅ Inyectar FormBuilder
    // private cursoService: CursoService // Descomentar si tienes un servicio de cursos
  ) {
    // ✅ Inicializar el formulario
    this.formularioCurso = this.fb.group({
      nombre: ['', Validators.required],
      duracion: ['', Validators.required],
      nivel: ['', Validators.required]
    });
  }

  // ✅ MÉTODO ngOnInit
  ngOnInit(): void {
    this.cargarCursos();
  }

  // ✅ MÉTODO cargarCursos (ejemplo, adapta a tu servicio)
  cargarCursos(): void {
    // Ejemplo de datos dummy si no tienes un servicio de cursos aún
    const dummyCursos: Curso[] = [
      { id: '1', nombre: 'Angular Básico', duracion: '40 horas', nivel: 'Principiante' },
      { id: '2', nombre: 'TypeScript Avanzado', duracion: '30 horas', nivel: 'Avanzado' }
    ];
    this.dataSource.data = dummyCursos;

    // Si tuvieras un servicio real:
    // this.cursoService.getCursos().subscribe(cursos => {
    //   this.dataSource.data = cursos;
    // });
  }

  // ✅ MÉTODO guardarCurso
  guardarCurso(): void {
    if (this.formularioCurso.valid) {
      const nuevoCurso: Curso = {
        ...this.formularioCurso.value,
        id: this.editandoCursoId || Math.random().toString(36).substring(2, 11) // Genera ID si es nuevo
      };

      if (this.editandoCursoId) {
        // Lógica de actualización
        // this.cursoService.updateCurso(nuevoCurso).subscribe(() => {
        //   this.cargarCursos();
        //   this.limpiarFormulario();
        // });
        const index = this.dataSource.data.findIndex(c => c.id === nuevoCurso.id);
        if (index !== -1) {
          this.dataSource.data[index] = nuevoCurso;
          this.dataSource._updateChangeSubscription(); // Para refrescar la tabla
        }
        console.log('Curso actualizado:', nuevoCurso);
      } else {
        // Lógica de adición
        // this.cursoService.addCurso(nuevoCurso).subscribe(() => {
        //   this.cargarCursos();
        //   this.limpiarFormulario();
        // });
        this.dataSource.data = [...this.dataSource.data, nuevoCurso];
        console.log('Curso agregado:', nuevoCurso);
      }
      this.limpiarFormulario();
    }
  }

  // ✅ MÉTODO editarCurso
  editarCurso(curso: Curso): void {
    this.editandoCursoId = curso.id;
    this.formularioCurso.patchValue(curso);
  }

  // ✅ MÉTODO eliminarCurso
  eliminarCurso(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      // this.cursoService.deleteCurso(id).subscribe(() => {
      //   this.cargarCursos();
      // });
      this.dataSource.data = this.dataSource.data.filter(c => c.id !== id);
      console.log('Curso eliminado:', id);
    }
  }

  // ✅ Método para limpiar el formulario
  limpiarFormulario(): void {
    this.formularioCurso.reset();
    this.editandoCursoId = null;
  }
}