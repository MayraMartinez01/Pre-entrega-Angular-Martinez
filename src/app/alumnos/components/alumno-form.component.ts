// src/app/components/alumno-form.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'; // Importar MatDialogModule
import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule

import { Alumno } from '../services/alumno.service'; // Asumiendo que Alumno está aquí

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ Importar ReactiveFormsModule
    MatDialogModule,     // ✅ Importar MatDialogModule (para mat-dialog-title, content, actions)
    MatInputModule,      // ✅ Importar MatInputModule
    MatFormFieldModule,  // ✅ Importar MatFormFieldModule
    MatButtonModule      // ✅ Importar MatButtonModule
  ],
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.scss']
})
export class AlumnoFormComponent implements OnInit {
  alumnoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AlumnoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno // 'data' contendrá el alumno si estamos editando
  ) {
    // Inicializar el formulario con FormBuilder
    this.alumnoForm = this.fb.group({
      id: [this.data?.id || null], // Mantener el ID si estamos editando
      nombre: [this.data?.nombre || '', Validators.required],
      apellido: [this.data?.apellido || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Si estamos editando, los datos ya se cargan en el constructor
  }

  onSave(): void {
    if (this.alumnoForm.valid) {
      this.dialogRef.close(this.alumnoForm.value); // Cerrar el diálogo y devolver los datos del formulario
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Cerrar el diálogo sin devolver datos
  }
}