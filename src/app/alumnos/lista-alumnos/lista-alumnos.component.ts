import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatTableModule, MatTableDataSource, MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { AlumnoService, Alumno } from '../services/alumno.service';
// ✅ ESTA LÍNEA ES CRÍTICA:
import { AlumnoFormComponent } from '../components/alumno-form.component';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    NgIf
  ],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
// ✅ ESTA LÍNEA ES CRÍTICA:
export class ListaAlumnosComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>();

  constructor(
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe(alumnos => {
      this.dataSource.data = alumnos;
    });
  }

  openAddEditDialog(alumno?: Alumno): void {
    const dialogRef = this.dialog.open(AlumnoFormComponent, {
      data: alumno,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (alumno && alumno.id) {
          this.alumnoService.updateAlumno(result).subscribe(() => {
            this.snackBar.open('Alumno actualizado con éxito', 'Cerrar', { duration: 2000 });
            this.cargarAlumnos();
          });
        } else {
          this.alumnoService.addAlumno(result).subscribe(() => {
            this.snackBar.open('Alumno agregado con éxito', 'Cerrar', { duration: 2000 });
            this.cargarAlumnos();
          });
        }
      }
    });
  }

  editAlumno(alumno: Alumno): void {
    this.openAddEditDialog(alumno);
  }

  deleteAlumno(id: string): void {
    if (confirm('¿Estás segura de que querés eliminar este alumno?')) {
      this.alumnoService.deleteAlumno(id).subscribe(() => {
        this.snackBar.open('Alumno eliminado con éxito', 'Cerrar', { duration: 2000 });
        this.cargarAlumnos();
      });
    }
  }
}