import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Corte } from 'src/app/_model/corte';
import { CorteService } from 'src/app/_service/corte.service';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.css']
})
export class CorteComponent implements OnInit {


  displayedColumns = ['id', 'estilo', 'tipo'];
  dataSource!: MatTableDataSource<Corte>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private corteService: CorteService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.corteService.getCorteCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.corteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.corteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(corte: Corte) {
    this.corteService.eliminar(corte.idCorte).pipe(switchMap(() => {
      return this.corteService.listar();
    })).subscribe(data => {
      this.corteService.setCorteCambio(data);
      this.corteService.setMensajeCambio('Se eliminó');
    });
  }

}
