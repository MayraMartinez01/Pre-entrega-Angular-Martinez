import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-lista-cursos',
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
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent {
  formularioCurso: FormGroup;
  cursos = [
    { nombre: 'Angular', duracion: '2 meses', nivel: 'Intermedio' },
    { nombre: 'React', duracion: '1.5 meses', nivel: 'Principiante' }
  ];
  displayedColumns: string[] = ['nombre', 'duracion', 'nivel', 'acciones'];
  dataSource = this.cursos;
  editandoIndex: number | null = null;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.formularioCurso = this.fb.group({
      nombre: ['', Validators.required],
      duracion: ['', Validators.required],
      nivel: ['', Validators.required]
    });
  }

  guardarCurso() {
    if (this.formularioCurso.valid) {
      if (this.editandoIndex !== null) {
        this.dataSource[this.editandoIndex] = this.formularioCurso.value;
        this.dataSource = [...this.dataSource];
        this.snackBar.open('Curso actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.editandoIndex = null;
      } else {
        this.dataSource = [...this.dataSource, this.formularioCurso.value];
        this.snackBar.open('Curso agregado exitosamente', 'Cerrar', { duration: 3000 });
      }
      this.formularioCurso.reset();
    }
  }

  editarCurso(index: number) {
    const curso = this.dataSource[index];
    this.formularioCurso.setValue({
      nombre: curso.nombre,
      duracion: curso.duracion,
      nivel: curso.nivel
    });
    this.editandoIndex = index;
  }

  eliminarCurso(index: number) {
    const eliminado = this.dataSource[index];
    this.dataSource = this.dataSource.filter((_, i) => i !== index);
    this.snackBar.open(`Curso ${eliminado.nombre} eliminado`, 'Cerrar', { duration: 3000 });
  }
}
