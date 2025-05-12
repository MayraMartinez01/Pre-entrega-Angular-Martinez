import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ ya lo tenés
import { NavbarComponent } from './layout/navbar/navbar.component'; // ✅ IMPORTAR EL COMPONENTE

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent], // ✅ AGREGAR AQUÍ
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
