import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
// Si estás usando standalone components como en tu caso, NO hace falta declarar el componente aquí.

@NgModule({
  imports: [
    CommonModule,
    InscripcionesRoutingModule
  ]
})
export class InscripcionesModule {}
