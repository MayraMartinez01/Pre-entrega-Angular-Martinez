import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { ListaAlumnosComponent } from './alumnos/lista-alumnos/lista-alumnos.component';

export const routes: Routes = [
  { path: '', loadComponent: () => HomeComponent },
  { path: 'alumnos', loadComponent: () => ListaAlumnosComponent }
];
