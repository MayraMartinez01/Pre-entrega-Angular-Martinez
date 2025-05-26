import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'alumnos',
    canActivate: [AdminGuard],
    loadChildren: () => import('./alumnos/alumnos.module').then(m => m.AlumnosModule)
  },
  {
    path: 'cursos',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'inscripciones',
    canActivate: [UserGuard],
    loadChildren: () => import('./inscripciones/inscripciones.module').then(m => m.InscripcionesModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];