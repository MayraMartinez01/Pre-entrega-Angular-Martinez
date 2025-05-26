import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Usuario {
  usuario: string;
  password: string;
  rol: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios: Usuario[] = [
    { usuario: 'admin', password: 'admin123', rol: 'admin' },
    { usuario: 'user', password: 'user123', rol: 'user' }
  ];

  obtenerUsuarios(): Observable<Usuario[]> {
    return of(this.usuarios);
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario[]> {
    this.usuarios.push(usuario);
    return of(this.usuarios);
  }

  editarUsuario(index: number, usuario: Usuario): Observable<Usuario[]> {
    this.usuarios[index] = usuario;
    return of(this.usuarios);
  }

  eliminarUsuario(index: number): Observable<Usuario[]> {
    this.usuarios.splice(index, 1);
    return of(this.usuarios);
  }
}
