// src/app/inscripciones/inscripciones.routes.ts
import { Routes } from '@angular/router';
import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';

export const INSCRIPCIONES_ROUTES: Routes = [
  { path: '', component: ListaInscripcionesComponent }
];