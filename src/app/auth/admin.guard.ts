// src/app/auth/admin.guard.ts

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userLoggedIn$.pipe( // Usa el Observable userLoggedIn$
    map(user => {
      if (user && user.role === 'admin') {
        return true;
      } else {
        router.navigate(['/dashboard']);
        return false;
      }
    })
  );
};