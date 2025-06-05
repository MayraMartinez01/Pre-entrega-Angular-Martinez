// src/app/alumnos/alumnos.routes.ts

import { Routes } from '@angular/router';
// ✅ CORRECCIÓN CLAVE: La ruta relativa para importar ListaAlumnosComponent
// Si alumnos.routes.ts está en src/app/alumnos/
// y ListaAlumnosComponent está en src/app/alumnos/lista-alumnos/
// entonces la ruta es './lista-alumnos/lista-alumnos.component'
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';

export const ALUMNOS_ROUTES: Routes = [ // ✅ ¡Exportación correcta!
  { path: '', component: ListaAlumnosComponent }
  // Puedes añadir rutas hijas específicas para el módulo de alumnos si las tienes
  // { path: 'detalle/:id', component: DetalleAlumnoComponent }
];