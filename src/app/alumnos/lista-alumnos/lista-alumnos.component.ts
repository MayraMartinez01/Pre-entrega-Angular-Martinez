import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../services/alumno.service';

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
    MatSnackBarModule
  ],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent {
  formularioAlumno: FormGroup;
  displayedColumns: string[] = ['nombre', 'curso', 'email'];
  dataSource: any[] = [];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private alumnoService: AlumnoService) {
    this.formularioAlumno = this.fb.group({
      nombre: ['', Validators.required],
      curso: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.alumnoService.obtenerAlumnos().subscribe(alumnos => {
      this.dataSource = alumnos;
    });
  }

  agregarAlumno() {
    if (this.formularioAlumno.valid) {
      this.dataSource = [...this.dataSource, this.formularioAlumno.value];
      this.snackBar.open('Alumno agregado exitosamente', 'Cerrar', { duration: 3000 });
      this.formularioAlumno.reset();
    }
  }
}
