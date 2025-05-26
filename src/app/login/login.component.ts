import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.scss'], // ❌ Quitado porque no existe el archivo
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { usuario, password } = this.loginForm.value;
      const success = this.authService.login(usuario, password);

      if (success) {
        const rol = this.authService.obtenerUsuario()?.rol;
        if (rol === 'admin') {
          this.router.navigate(['/alumnos']);
        } else if (rol === 'user') {
          this.router.navigate(['/inscripciones']);
        }
      } else {
        alert('Credenciales inválidas');
      }
    }
  }
}
