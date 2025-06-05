// src/app/inscripciones/inscripciones-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Asegúrate de que importas el componente principal que quieres mostrar
import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';

const routes: Routes = [
  {
    path: '', // <<-- Ruta vacía significa que es la ruta por defecto cuando se carga el módulo /user/inscripciones
    component: ListaInscripcionesComponent // <<-- ¡Este es el componente que debe cargarse!
    // Si tienes rutas hijas dentro de inscripciones (ej. /inscripciones/detalle/:id), irían aquí
    // children: [
    //   { path: 'detalle/:id', component: DetalleInscripcionComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // <<-- ¡MUY IMPORTANTE: USAR forChild para Lazy Loading!
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }