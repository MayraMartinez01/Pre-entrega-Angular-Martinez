// src/app/cursos/components/curso-form.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { Curso } from '../../cursos/services/curso.service'; // ✅ Ajusta la importación a tu servicio

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {
  cursoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CursoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curso // 'data' contendrá el curso si estamos editando
  ) {
    this.cursoForm = this.fb.group({
      id: [this.data?.id || null],
      nombre: [this.data?.nombre || '', Validators.required],
      duracion: [this.data?.duracion || null, [Validators.required, Validators.min(1)]], // ✅ Ajustado a 'duracion' y tipo number
      nivel: [this.data?.nivel || '', Validators.required] // ✅ Ajustado a 'nivel'
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.cursoForm.valid) {
      this.dialogRef.close(this.cursoForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}