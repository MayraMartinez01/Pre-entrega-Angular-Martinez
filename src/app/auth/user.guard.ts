import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const usuario = this.authService.obtenerUsuario();
    if (usuario?.rol === 'user') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
