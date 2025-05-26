import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios = [
    { usuario: 'admin', password: 'admin123', rol: 'admin' },
    { usuario: 'user', password: 'user123', rol: 'user' }
  ];

  private usuarioAutenticado: any = null;

  login(usuario: string, password: string): boolean {
    const user = this.usuarios.find(u => u.usuario === usuario && u.password === password);
    if (user) {
      this.usuarioAutenticado = user;
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuarioAutenticado = null;
  }

  obtenerUsuario(): any {
    return this.usuarioAutenticado;
  }

  obtenerRol(): string | null {
    return this.usuarioAutenticado?.rol || null;
  }
}
