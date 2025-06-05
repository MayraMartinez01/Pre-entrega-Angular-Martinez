// src/app/inscripciones/inscripciones.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Asegúrate de que este import exista y sea correcto
import { InscripcionesRoutingModule } from './inscripciones-routing.module';

// Si ListaInscripcionesComponent NO es standalone, debe estar declarado aquí
// import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';
// Importa cualquier otro componente o módulo que este módulo necesite.

@NgModule({
  declarations: [
    // Si ListaInscripcionesComponent NO es standalone, va aquí
    // ListaInscripcionesComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule, // <<-- ¡Debe importar su módulo de rutas!
    // Agrega cualquier otro módulo de Angular Material u otros módulos compartidos que uses aquí (ej. MatTableModule, MatCardModule)
  ]
})
export class InscripcionesModule { }