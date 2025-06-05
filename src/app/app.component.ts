// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como NgIf, NgFor
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Necesario para peticiones HTTP (tu CursoService)
import { NavbarComponent } from './layout/navbar/navbar.component'; // ✅ RUTA CORRECTA PARA app/layout/navbar/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pre-entrega-Angular-Martinez';
}