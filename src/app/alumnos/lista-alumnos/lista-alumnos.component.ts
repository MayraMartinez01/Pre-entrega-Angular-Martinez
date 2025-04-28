import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

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
  alumnos = [
    { nombre: 'Ana Pérez', curso: 'Angular', email: 'ana@example.com' },
    { nombre: 'Luis Gómez', curso: 'React', email: 'luis@example.com' },
    { nombre: 'Carla Ruiz', curso: 'Vue', email: 'carla@example.com' }
  ];
  displayedColumns: string[] = ['nombre', 'curso', 'email'];
  dataSource = this.alumnos;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.formularioAlumno = this.fb.group({
      nombre: ['', Validators.required],
      curso: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  agregarAlumno() {
    if (this.formularioAlumno.valid) {
      this.dataSource = [...this.dataSource, this.formularioAlumno.value];
      this.snackBar.open(
        `Alumno ${this.formularioAlumno.value.nombre} agregado exitosamente`,
        'Cerrar',
        {
          duration: 3000,
          verticalPosition: 'top'
        }
      );
      this.formularioAlumno.reset();
    }
  }
}
