import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './inscripciones-routing.module';
import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ListaInscripcionesComponent
  ]
})
export class InscripcionesModule {}
