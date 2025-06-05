// src/app/inscripciones/inscripciones.routes.ts

import { Routes } from '@angular/router';
// ✅ CORRECCIÓN: Asegura que esta ruta a ListaInscripcionesComponent es correcta desde aquí
import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';

export const INSCRIPCIONES_ROUTES: Routes = [ // ✅ Exportación correcta
  { path: '', component: ListaInscripcionesComponent }
];