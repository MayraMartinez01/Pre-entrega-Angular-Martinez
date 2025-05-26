import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

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
    NgIf // ✅ Importado correctamente
  ],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent implements OnInit {
  formularioAlumno: FormGroup;
  displayedColumns: string[] = ['nombre', 'curso', 'email'];
  dataSource: any[] = [];
  editandoIndex: number | null = null;
  rol: string | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.formularioAlumno = this.fb.group({
      nombre: ['', Validators.required],
      curso: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.rol = this.authService.obtenerRol();
    if (this.rol === 'admin') {
      this.displayedColumns.push('acciones');
    }
  }

  agregarAlumno(): void {
    if (this.formularioAlumno.valid) {
      if (this.editandoIndex !== null) {
        this.dataSource[this.editandoIndex] = this.formularioAlumno.value;
        this.snackBar.open('Alumno actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.editandoIndex = null;
      } else {
        this.dataSource.push(this.formularioAlumno.value);
        this.snackBar.open('Alumno agregado exitosamente', 'Cerrar', { duration: 3000 });
      }
      this.dataSource = [...this.dataSource];
      this.formularioAlumno.reset();
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
    this.dataSource.splice(index, 1);
    this.dataSource = [...this.dataSource];
    this.snackBar.open('Alumno eliminado correctamente', 'Cerrar', { duration: 3000 });
    this.formularioAlumno.reset();
    this.editandoIndex = null;
  }
}
