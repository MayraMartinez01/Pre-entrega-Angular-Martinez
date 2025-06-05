// src/app/inscripciones/lista-inscripciones/lista-inscripciones.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // ✅ Importar ReactiveFormsModule, FormBuilder, etc.
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; // ✅ Importar MatTableModule y MatTableDataSource
import { MatCardModule } from '@angular/material/card'; // ✅ Importar MatCardModule
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Si usas íconos
import { MatInputModule } from '@angular/material/input'; // ✅ Importar MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field'; // ✅ Importar MatFormFieldModule
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos si es necesario

// Asumo que tienes un servicio de inscripciones y una interfaz Inscripcion
// También asumo que tienes interfaces para Alumno y Curso si las usas.
// import { InscripcionService, Inscripcion } from '../services/inscripcion.service';
// import { Alumno } from '../../alumnos/services/alumno.service';
// import { Curso } from '../../cursos/services/curso.service';

interface Inscripcion { // Define la interfaz Inscripcion
  id: string;
  alumno: string; // O el tipo de Alumno completo
  curso: string;  // O el tipo de Curso completo
  fecha: string;
}

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,         // ✅ Añadir MatTableModule
    MatCardModule,          // ✅ Añadir MatCardModule
    MatButtonModule,
    MatIconModule,          // Si usas MatIcon
    MatInputModule,         // ✅ Añadir MatInputModule
    MatFormFieldModule,     // ✅ Añadir MatFormFieldModule
    ReactiveFormsModule     // ✅ Añadir ReactiveFormsModule
  ],
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent implements OnInit {

  // ✅ PROPIEDADES NECESARIAS
  displayedColumns: string[] = ['alumno', 'curso', 'fecha', 'acciones']; // Ajusta según tus columnas
  dataSource = new MatTableDataSource<Inscripcion>();
  formularioInscripcion: FormGroup; // ✅ Propiedad del formulario
  editandoIndex: string | null = null; // ✅ Para saber si estamos editando o agregando (o un ID)

  // Asumo que inyectas un servicio de inscripciones
  constructor(
    private fb: FormBuilder, // ✅ Inyectar FormBuilder
    // private inscripcionService: InscripcionService // Descomentar si tienes un servicio de inscripciones
  ) {
    // ✅ Inicializar el formulario
    this.formularioInscripcion = this.fb.group({
      alumno: ['', Validators.required],
      curso: ['', Validators.required],
      fecha: ['', Validators.required] // Considera usar MatDatepicker si es una fecha real
    });
  }

  // ✅ MÉTODO ngOnInit
  ngOnInit(): void {
    this.cargarInscripciones();
  }

  // ✅ MÉTODO cargarInscripciones (ejemplo, adapta a tu servicio)
  cargarInscripciones(): void {
    // Ejemplo de datos dummy
    const dummyInscripciones: Inscripcion[] = [
      { id: uuidv4(), alumno: 'Juan Pérez', curso: 'Angular Básico', fecha: '2023-01-15' },
      { id: uuidv4(), alumno: 'María Gómez', curso: 'TypeScript Avanzado', fecha: '2023-02-20' }
    ];
    this.dataSource.data = dummyInscripciones;

    // Si tuvieras un servicio real:
    // this.inscripcionService.getInscripciones().subscribe(inscripciones => {
    //   this.dataSource.data = inscripciones;
    // });
  }

  // ✅ MÉTODO guardarInscripcion
  guardarInscripcion(): void {
    if (this.formularioInscripcion.valid) {
      const nuevaInscripcion: Inscripcion = {
        ...this.formularioInscripcion.value,
        id: this.editandoIndex || uuidv4() // Genera ID si es nueva
      };

      if (this.editandoIndex) {
        // Lógica de actualización
        // this.inscripcionService.updateInscripcion(nuevaInscripcion).subscribe(() => {
        //   this.cargarInscripciones();
        //   this.limpiarFormulario();
        // });
        const index = this.dataSource.data.findIndex(i => i.id === nuevaInscripcion.id);
        if (index !== -1) {
          this.dataSource.data[index] = nuevaInscripcion;
          this.dataSource._updateChangeSubscription(); // Para refrescar la tabla
        }
        console.log('Inscripción actualizada:', nuevaInscripcion);
      } else {
        // Lógica de adición
        // this.inscripcionService.addInscripcion(nuevaInscripcion).subscribe(() => {
        //   this.cargarInscripciones();
        //   this.limpiarFormulario();
        // });
        this.dataSource.data = [...this.dataSource.data, nuevaInscripcion];
        console.log('Inscripción agregada:', nuevaInscripcion);
      }
      this.limpiarFormulario();
    }
  }

  // ✅ MÉTODO editarInscripcion
  editarInscripcion(id: string): void { // Cambié index por id, es más robusto
    const inscripcionAEditar = this.dataSource.data.find(i => i.id === id);
    if (inscripcionAEditar) {
      this.editandoIndex = id;
      this.formularioInscripcion.patchValue(inscripcionAEditar);
    }
  }

  // ✅ MÉTODO eliminarInscripcion
  eliminarInscripcion(id: string): void { // Cambié index por id
    if (confirm('¿Estás seguro de que quieres eliminar esta inscripción?')) {
      // this.inscripcionService.deleteInscripcion(id).subscribe(() => {
      //   this.cargarInscripciones();
      // });
      this.dataSource.data = this.dataSource.data.filter(i => i.id !== id);
      console.log('Inscripción eliminada:', id);
    }
  }

  // ✅ Método para limpiar el formulario
  limpiarFormulario(): void {
    this.formularioInscripcion.reset();
    this.editandoIndex = null;
  }
}