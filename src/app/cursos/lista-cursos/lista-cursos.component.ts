// src/app/cursos/lista-cursos/lista-cursos.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { v4 as uuidv4 } from 'uuid'; // Ya no necesitamos uuidv4 porque mockapi.io genera el ID

import { CursoFormComponent } from '../components/curso-form.component';
import { CursoService, Curso } from '../services/curso.service'; // ✅ Importar CursoService y Curso

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {

  // ✅ displayedColumns alineadas con tu interfaz Curso en mockapi.io
  displayedColumns: string[] = ['nombre', 'duracion', 'nivel', 'acciones'];
  dataSource = new MatTableDataSource<Curso>();

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cursoService: CursoService // ✅ Inyectar CursoService
  ) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    // ✅ Usar el servicio para obtener los cursos
    this.cursoService.obtenerCursos().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
      error: (error) => {
        console.error('Error al cargar los cursos:', error);
        this.snackBar.open('Error al cargar los cursos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openAddEditDialog(curso?: Curso): void {
    const dialogRef = this.dialog.open(CursoFormComponent, {
      data: curso,
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si el diálogo se cerró con datos (se guardó)
        if (curso && curso.id) {
          // ✅ Usar el servicio para editar
          this.cursoService.editarCurso(curso.id, result).subscribe({
            next: () => {
              this.snackBar.open('Curso actualizado con éxito', 'Cerrar', { duration: 2000 });
              this.cargarCursos(); // Volver a cargar para reflejar los cambios
            },
            error: (error) => {
              console.error('Error al actualizar curso:', error);
              this.snackBar.open('Error al actualizar curso', 'Cerrar', { duration: 3000 });
            }
          });
        } else {
          // ✅ Usar el servicio para agregar
          // Omit<Curso, 'id'> porque el ID lo genera el backend
          this.cursoService.agregarCurso(result as Omit<Curso, 'id'>).subscribe({
            next: () => {
              this.snackBar.open('Curso agregado con éxito', 'Cerrar', { duration: 2000 });
              this.cargarCursos(); // Volver a cargar para reflejar el nuevo curso
            },
            error: (error) => {
              console.error('Error al agregar curso:', error);
              this.snackBar.open('Error al agregar curso', 'Cerrar', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  editCurso(curso: Curso): void {
    this.openAddEditDialog(curso);
  }

  deleteCurso(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      // ✅ Usar el servicio para eliminar
      this.cursoService.eliminarCurso(id).subscribe({
        next: () => {
          this.snackBar.open('Curso eliminado con éxito', 'Cerrar', { duration: 2000 });
          this.cargarCursos(); // Volver a cargar para reflejar los cambios
        },
        error: (error) => {
          console.error('Error al eliminar curso:', error);
          this.snackBar.open('Error al eliminar curso', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}