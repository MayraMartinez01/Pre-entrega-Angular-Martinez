import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./alumnos/alumnos-routing.module').then((m) => m.AlumnosRoutingModule)
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./cursos/cursos-routing.module').then((m) => m.CursosRoutingModule)
  },
  {
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'alumnos'
  }
];
