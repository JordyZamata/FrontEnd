import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Tela } from 'src/app/_model/tela';
import { TelaService } from 'src/app/_service/tela.service';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.css']
})
export class TelaComponent implements OnInit {

  displayedColumns = ['id', 'color', 'estilo', 'peso', 'acciones'];
  dataSource!: MatTableDataSource<Tela>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private telaService: TelaService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.telaService.getTelaCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.telaService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.telaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(tela: Tela) {
    this.telaService.eliminar(tela.idTela).pipe(switchMap(() => {
      return this.telaService.listar();
    })).subscribe(data => {
      this.telaService.setTelaCambio(data);
      this.telaService.setMensajeCambio('Se eliminó');
    });

  }
}
