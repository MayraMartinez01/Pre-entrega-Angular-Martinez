import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CursoService, Curso } from '../services/curso.service';
import { NgIf } from '@angular/common';

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
export class ListaCursosComponent implements OnInit {
  formularioCurso: FormGroup;
  displayedColumns: string[] = ['nombre', 'duracion', 'nivel', 'acciones'];
  dataSource: Curso[] = [];
  editandoIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cursoService: CursoService
  ) {
    this.formularioCurso = this.fb.group({
      nombre: ['', Validators.required],
      duracion: ['', Validators.required],
      nivel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cursoService.obtenerCursos().subscribe(cursos => {
      this.dataSource = cursos;
    });
  }

  guardarCurso(): void {
    if (this.formularioCurso.valid) {
      const curso = this.formularioCurso.value;

      if (this.editandoIndex !== null) {
        this.cursoService.editarCurso(this.editandoIndex, curso).subscribe(cursos => {
          this.dataSource = cursos;
          this.snackBar.open('Curso actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.editandoIndex = null;
          this.formularioCurso.reset();
        });
      } else {
        this.cursoService.agregarCurso(curso).subscribe(cursos => {
          this.dataSource = cursos;
          this.snackBar.open('Curso agregado exitosamente', 'Cerrar', { duration: 3000 });
          this.formularioCurso.reset();
        });
      }
    }
  }

  editarCurso(index: number): void {
    const curso = this.dataSource[index];
    this.formularioCurso.setValue({
      nombre: curso.nombre,
      duracion: curso.duracion,
      nivel: curso.nivel
    });
    this.editandoIndex = index;
  }

  eliminarCurso(index: number): void {
    this.cursoService.eliminarCurso(index).subscribe(cursos => {
      this.dataSource = cursos;
      this.snackBar.open('Curso eliminado correctamente', 'Cerrar', { duration: 3000 });
    });
  }
}
