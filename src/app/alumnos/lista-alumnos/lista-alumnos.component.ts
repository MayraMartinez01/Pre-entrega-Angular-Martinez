import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AlumnoService, Alumno } from '../services/alumno.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-lista-alumnos',
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
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent implements OnInit {
  formularioAlumno: FormGroup;
  displayedColumns: string[] = ['nombre', 'curso', 'email', 'acciones'];
  dataSource: Alumno[] = [];
  editandoIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private alumnoService: AlumnoService
  ) {
    this.formularioAlumno = this.fb.group({
      nombre: ['', Validators.required],
      curso: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.alumnoService.obtenerAlumnos().subscribe(alumnos => {
      this.dataSource = alumnos;
    });
  }

  agregarAlumno(): void {
    if (this.formularioAlumno.valid) {
      const alumno = this.formularioAlumno.value;

      if (this.editandoIndex !== null) {
        this.alumnoService.editarAlumno(this.editandoIndex, alumno).subscribe(alumnos => {
          this.dataSource = alumnos;
          this.snackBar.open('Alumno actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.editandoIndex = null;
          this.formularioAlumno.reset();
        });
      } else {
        this.alumnoService.agregarAlumno(alumno).subscribe(alumnos => {
          this.dataSource = alumnos;
          this.snackBar.open('Alumno agregado exitosamente', 'Cerrar', { duration: 3000 });
          this.formularioAlumno.reset();
        });
      }
    }
  }

  editarAlumno(index: number): void {
    const alumno = this.dataSource[index];
    this.formularioAlumno.setValue({
      nombre: alumno.nombre,
      curso: alumno.curso,
      email: alumno.email
    });
    this.editandoIndex = index;
  }

  eliminarAlumno(index: number): void {
    this.alumnoService.eliminarAlumno(index).subscribe(alumnos => {
      this.dataSource = alumnos;
      this.snackBar.open('Alumno eliminado', 'Cerrar', { duration: 3000 });
    });
  }
}
