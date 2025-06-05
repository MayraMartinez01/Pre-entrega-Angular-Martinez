// src/app/components/inscripcion-form.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

// Si tienes interfaces para Alumno y Curso, impórtalas aquí
// import { Alumno } from '../services/alumno.service';
// import { Curso } from '../services/curso.service';

interface Inscripcion {
  id?: string; // id puede ser opcional al crear
  alumno: string;
  curso: string;
  fecha: string;
}

@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './inscripcion-form.component.html',
  styleUrls: ['./inscripcion-form.component.scss']
})
export class InscripcionFormComponent implements OnInit {
  inscripcionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InscripcionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inscripcion // 'data' contendrá la inscripción si estamos editando
  ) {
    this.inscripcionForm = this.fb.group({
      id: [this.data?.id || null],
      alumno: [this.data?.alumno || '', Validators.required],
      curso: [this.data?.curso || '', Validators.required],
      fecha: [this.data?.fecha || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.inscripcionForm.valid) {
      this.dialogRef.close(this.inscripcionForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}