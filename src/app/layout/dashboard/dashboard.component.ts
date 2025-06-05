// src/app/layout/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas comunes
import { RouterModule } from '@angular/router'; // Necesario para routerLink

// Importa los módulos de Angular Material para los botones e íconos
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'; // Si usas toolbar en el layout
import { MatSidenavModule } from '@angular/material/sidenav'; // Si usas sidenav
import { MatListModule } from '@angular/material/list';     // Si usas listas en sidenav

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Importar RouterModule para que routerLink funcione
    MatButtonModule, // Para mat-raised-button
    MatIconModule,   // Para mat-icon
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
    // Otros módulos que uses en tu dashboard
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Aquí va la lógica de tu dashboard, si tienes alguna
  constructor() { }
}