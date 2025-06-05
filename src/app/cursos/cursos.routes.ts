// src/app/cursos/cursos.routes.ts

import { Routes } from '@angular/router';
// ✅ CORRECCIÓN CLAVE: La ruta relativa para importar ListaCursosComponent
// Si cursos.routes.ts está en src/app/cursos/
// y ListaCursosComponent está en src/app/cursos/lista-cursos/
// entonces la ruta es './lista-cursos/lista-cursos.component'
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';

export const CURSOS_ROUTES: Routes = [ // ✅ Exportación correcta para admin
  { path: '', component: ListaCursosComponent }
];

export const CURSOS_ROUTES_FOR_USER: Routes = [ // ✅ Exportación correcta para user
  { path: '', component: ListaCursosComponent }
];