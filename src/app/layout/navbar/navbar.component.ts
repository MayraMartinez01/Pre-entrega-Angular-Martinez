// src/app/layout/navbar/navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule si es necesario
import { Router, RouterModule } from '@angular/router'; // Importar Router y RouterModule
import { MatButtonModule } from '@angular/material/button'; // Para los botones de Material
import { MatToolbarModule } from '@angular/material/toolbar'; // Si usas MatToolbar
import { MatIconModule } from '@angular/material/icon'; // Si usas MatIcon

import { AuthService } from '../../auth/auth.service'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Para que funcione routerLink, aunque no lo uses directamente aquí, es buena práctica si el navbar es un padre
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  // ✅ CORRECCIÓN CLAVE AQUÍ: debe apuntar a SU PROPIO HTML
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'] // Asegúrate de que este archivo exista
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false; // Puedes usar esto para mostrar/ocultar elementos
  userName: string | null = null; // Para mostrar el nombre del usuario

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Suscribirse al estado de autenticación para actualizar la vista
    this.authService.userLoggedIn$.subscribe(user => {
      this.isLoggedIn = !!user; // true si hay un usuario, false si es null
    this.userName = user ? user.username : null; // ✅ CORRECCIÓN: Usar 'username' en minúsculas
    });
  }

  // Si quieres que el Navbar también tenga un botón de logout
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Si quieres enlaces de navegación dentro del Navbar
  goToAlumnos(): void {
    this.router.navigate(['/admin/alumnos']);
  }

  goToCursos(): void {
    this.router.navigate(['/admin/cursos']);
  }

  // ...otros métodos de navegación
}