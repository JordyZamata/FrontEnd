import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Cortador } from 'src/app/_model/cortador';
import { CortadorService } from 'src/app/_service/cortador.service';
import { CortadorDialogoComponent } from './cortador-dialogo/cortador-dialogo.component';

@Component({
  selector: 'app-cortador',
  templateUrl: './cortador.component.html',
  styleUrls: ['./cortador.component.css']
})
export class CortadorComponent implements OnInit {

  displayedColumns = ['idcortador', 'nombres', 'apellidos', 'telefono', 'acciones'];
  dataSource!: MatTableDataSource<Cortador>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private cortadorService: CortadorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cortadorService.getCortadorCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.cortadorService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.cortadorService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(cortador: Cortador) {
    this.cortadorService.eliminar(cortador.idCortador).pipe(switchMap(() => {
      return this.cortadorService.listar();
    })).subscribe(data => {
      this.cortadorService.setCortadorCambio(data);
      this.cortadorService.setMensajeCambio('SE ELIMNO');
    });
  }

  abrirDialogo(cortador?: Cortador) {
    let med = cortador != null ? cortador : new Cortador();
    this.dialog.open(CortadorDialogoComponent, {
      width: '250px',
      data: med
    });
  }

}
