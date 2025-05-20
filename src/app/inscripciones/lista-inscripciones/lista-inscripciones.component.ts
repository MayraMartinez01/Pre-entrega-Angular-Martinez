import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { InscripcionService } from '../services/inscripcion.service';

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    NgIf
  ],
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent {
  formularioInscripcion: FormGroup;
  displayedColumns: string[] = ['alumno', 'curso', 'fecha', 'acciones'];
  dataSource: any[] = [];
  editandoIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private inscripcionService: InscripcionService
  ) {
    this.formularioInscripcion = this.fb.group({
      alumno: ['', Validators.required],
      curso: ['', Validators.required],
      fecha: ['', Validators.required]
    });

    this.inscripcionService.obtenerInscripciones().subscribe(data => {
      this.dataSource = data;
    });
  }

  guardarInscripcion() {
    if (this.formularioInscripcion.valid) {
      if (this.editandoIndex !== null) {
        this.dataSource[this.editandoIndex] = this.formularioInscripcion.value;
        this.snackBar.open('Inscripción actualizada correctamente', 'Cerrar', { duration: 3000 });
        this.editandoIndex = null;
      } else {
        this.dataSource = [...this.dataSource, this.formularioInscripcion.value];
        this.snackBar.open('Inscripción agregada correctamente', 'Cerrar', { duration: 3000 });
      }

      this.dataSource = [...this.dataSource];
      this.formularioInscripcion.reset();
    }
  }

  editarInscripcion(index: number) {
    const inscripcion = this.dataSource[index];
    this.formularioInscripcion.setValue({
      alumno: inscripcion.alumno,
      curso: inscripcion.curso,
      fecha: inscripcion.fecha
    });
    this.editandoIndex = index;
  }

  eliminarInscripcion(index: number) {
    const eliminada = this.dataSource[index];
    this.dataSource = this.dataSource.filter((_, i) => i !== index);
    this.snackBar.open(`Inscripción de ${eliminada.alumno} eliminada`, 'Cerrar', { duration: 3000 });
  }
}
