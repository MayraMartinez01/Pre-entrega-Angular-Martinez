// src/app/app.routes.ts

import { Routes } from '@angular/router';
// Importamos los guards con sus nombres EXACTOS, en minúsculas, como funciones
import { adminGuard } from './auth/admin.guard';
import { userGuard } from './auth/user.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [userGuard], // Usamos el guard en minúscula como una función
    loadComponent: () => import('./layout/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'admin',
    canActivate: [userGuard, adminGuard], // Usamos los guards en minúscula como funciones
    children: [
      {
        path: 'alumnos',
        loadChildren: () => import('./alumnos/alumnos.routes').then(r => r.ALUMNOS_ROUTES)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./cursos/cursos.routes').then(r => r.CURSOS_ROUTES)
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('./inscripciones/inscripciones.routes').then(r => r.INSCRIPCIONES_ROUTES)
      },
      {
        path: '**',
        redirectTo: 'alumnos'
      }
    ]
  },
  {
    path: 'user',
    canActivate: [userGuard], // Usamos el guard en minúscula como una función
    children: [
      {
        path: 'cursos',
        loadChildren: () => import('./cursos/cursos.routes').then(r => r.CURSOS_ROUTES_FOR_USER)
      },
      {
        path: '**',
        redirectTo: 'cursos'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];