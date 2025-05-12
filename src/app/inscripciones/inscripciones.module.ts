import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './inscripciones-routing.module';

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class InscripcionesModule {}
