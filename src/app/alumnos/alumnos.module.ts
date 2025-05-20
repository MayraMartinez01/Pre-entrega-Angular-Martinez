import { NgModule } from '@angular/core';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';

@NgModule({
  imports: [
    AlumnosRoutingModule,
    ListaAlumnosComponent
  ]
})
export class AlumnosModule {}
