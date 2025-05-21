import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { InscripcionService, Inscripcion } from '../services/inscripcion.service';
import { NgIf } from '@angular/common';

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
export class ListaInscripcionesComponent implements OnInit {
  formularioInscripcion: FormGroup;
  displayedColumns: string[] = ['alumno', 'curso', 'fecha', 'acciones'];
  dataSource: Inscripcion[] = [];
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
  }

  ngOnInit(): void {
    this.inscripcionService.obtenerInscripciones().subscribe(inscripciones => {
      this.dataSource = inscripciones;
    });
  }

  guardarInscripcion(): void {
    if (this.formularioInscripcion.valid) {
      const inscripcion = this.formularioInscripcion.value;

      if (this.editandoIndex !== null) {
        this.inscripcionService.editarInscripcion(this.editandoIndex, inscripcion).subscribe(inscripciones => {
          this.dataSource = inscripciones;
          this.snackBar.open('Inscripción actualizada correctamente', 'Cerrar', { duration: 3000 });
          this.editandoIndex = null;
          this.formularioInscripcion.reset();
        });
      } else {
        this.inscripcionService.agregarInscripcion(inscripcion).subscribe(inscripciones => {
          this.dataSource = inscripciones;
          this.snackBar.open('Inscripción agregada exitosamente', 'Cerrar', { duration: 3000 });
          this.formularioInscripcion.reset();
        });
      }
    }
  }

  editarInscripcion(index: number): void {
    const inscripcion = this.dataSource[index];
    this.formularioInscripcion.setValue({
      alumno: inscripcion.alumno,
      curso: inscripcion.curso,
      fecha: inscripcion.fecha
    });
    this.editandoIndex = index;
  }

  eliminarInscripcion(index: number): void {
    this.inscripcionService.eliminarInscripcion(index).subscribe(inscripciones => {
      this.dataSource = inscripciones;
      this.snackBar.open(`Inscripción de ${inscripciones[index]?.alumno || ''} eliminada`, 'Cerrar', { duration: 3000 });
    });
  }
}
