// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs'; // ✅ Asegúrate de importar estos

// Interfaz para el usuario
export interface Usuario {
  username: string;
  role: 'admin' | 'user';
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ✅ Estas dos líneas son CRÍTICAS para que los guards funcionen
  private loggedInUserSubject = new BehaviorSubject<Usuario | null>(null);
  userLoggedIn$: Observable<Usuario | null> = this.loggedInUserSubject.asObservable(); // ✅ Expone userLoggedIn$ como un Observable

  constructor(private router: Router) {
    // Intenta cargar el usuario desde localStorage al iniciar el servicio
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.loggedInUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(usuario: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      let user: Usuario | null = null;
      if (usuario === 'admin' && password === 'admin') {
        user = { username: 'admin', role: 'admin', id: '1' };
      } else if (usuario === 'user' && password === 'user') {
        user = { username: 'user', role: 'user', id: '2' };
      }

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.loggedInUserSubject.next(user); // ✅ Actualiza el BehaviorSubject con el usuario logueado
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  getLoggedInUser(): Usuario | null {
    return this.loggedInUserSubject.value; // ✅ Asegúrate de devolver el valor del BehaviorSubject
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null); // ✅ Limpia el BehaviorSubject
    this.router.navigate(['/login']);
  }
}