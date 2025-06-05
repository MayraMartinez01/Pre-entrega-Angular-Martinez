// src/app/alumnos/components/alumno-form.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

// ✅ MUY IMPORTANTE: Esta ruta depende de que 'alumno.service.ts' esté en 'src/app/alumnos/services/'
// y 'alumno-form.component.ts' esté en 'src/app/alumnos/components/'.
// Si están así, la ruta relativa es '../services/alumno.service'
import { AlumnoService, Alumno } from '../services/alumno.service'; // Importamos también la interfaz Alumno

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './alumno-form.component.html', // ✅ Asegúrate de que este archivo HTML exista
  styleUrls: ['./alumno-form.component.scss'] // ✅ Asegúrate de que este archivo SCSS exista (puede estar vacío)
})
export class AlumnoFormComponent implements OnInit {
  alumnoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AlumnoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
    private alumnoService: AlumnoService // Inyecta el servicio
  ) {
    this.alumnoForm = this.fb.group({
      id: [this.data?.id || null], // ID puede ser null para nuevos alumnos
      nombre: [this.data?.nombre || '', Validators.required],
      apellido: [this.data?.apellido || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      fechaRegistro: [this.data?.fechaRegistro || '', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.alumnoForm.patchValue(this.data);
    }
  }

  onSave(): void {
    if (this.alumnoForm.valid) {
      // Envía el formulario de vuelta al componente padre (lista-alumnos) a través del diálogo
      this.dialogRef.close(this.alumnoForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Cierra el diálogo sin enviar datos
  }
}