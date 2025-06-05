// src/app/inscripciones/lista-inscripciones/lista-inscripciones.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // ✅ Importar MatDialog y MatDialogModule

import { InscripcionFormComponent } from '../components/inscripcion-form.component'; // ✅ Importar el nuevo componente

interface Inscripcion {
  id: string;
  alumno: string;
  curso: string;
  fecha: string;
}

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule // ✅ Añadir MatDialogModule a los imports
  ],
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent implements OnInit {

  displayedColumns: string[] = ['alumno', 'curso', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Inscripcion>();
  // Ya no necesitas formularioInscripcion ni editandoIndex aquí si usas el diálogo
  // formularioInscripcion: FormGroup;
  // editandoIndex: string | null = null;

  constructor(
    // private fb: FormBuilder, // Ya no necesitas FormBuilder aquí
    private snackBar: MatSnackBar,
    public dialog: MatDialog // ✅ Inyectar MatDialog
  ) {
    // this.formularioInscripcion = this.fb.group(...) // Ya no necesitas inicializar aquí
  }

  ngOnInit(): void {
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    const dummyInscripciones: Inscripcion[] = [
      { id: uuidv4(), alumno: 'Juan Pérez', curso: 'Angular Básico', fecha: '2023-01-15' },
      { id: uuidv4(), alumno: 'María Gómez', curso: 'TypeScript Avanzado', fecha: '2023-02-20' }
    ];
    this.dataSource.data = dummyInscripciones;
  }

  // ✅ Nuevo método para abrir el diálogo de agregar/editar
  openAddEditDialog(inscripcion?: Inscripcion): void {
    const dialogRef = this.dialog.open(InscripcionFormComponent, {
      data: inscripcion, // Pasa la inscripción si es para editar
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si se guardó algo
        if (inscripcion && inscripcion.id) {
          // Lógica para actualizar (en tu caso, con datos dummy)
          const index = this.dataSource.data.findIndex(i => i.id === result.id);
          if (index !== -1) {
            this.dataSource.data[index] = result;
            this.dataSource._updateChangeSubscription();
            this.snackBar.open('Inscripción actualizada con éxito', 'Cerrar', { duration: 2000 });
          }
        } else {
          // Lógica para agregar (en tu caso, con datos dummy)
          const nuevaInscripcion: Inscripcion = { ...result, id: uuidv4() }; // Asegurar un ID
          this.dataSource.data = [...this.dataSource.data, nuevaInscripcion];
          this.dataSource._updateChangeSubscription(); // Refrescar la tabla
          this.snackBar.open('Inscripción agregada con éxito', 'Cerrar', { duration: 2000 });
        }
      }
    });
  }

  // ✅ Modificar el método editarInscripcion para usar el diálogo
  editInscripcion(inscripcion: Inscripcion): void {
    this.openAddEditDialog(inscripcion);
  }

  // ✅ Modificar el método eliminarInscripcion para forzar el refresco de la tabla
  deleteInscripcion(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta inscripción?')) {
      this.dataSource.data = this.dataSource.data.filter(i => i.id !== id);
      this.dataSource._updateChangeSubscription(); // ✅ FUERZA EL REFRESCO DE LA TABLA
      this.snackBar.open('Inscripción eliminada con éxito', 'Cerrar', { duration: 2000 });
    }
  }

  // Los métodos guardarInscripcion y limpiarFormulario ya no son necesarios aquí si usas el diálogo
  // guardarInscripcion(): void { ... }
  // limpiarFormulario(): void { ... }
}