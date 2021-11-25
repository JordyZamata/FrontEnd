import { Cliente } from './../../_model/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from 'src/app/_service/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {


  displayedColumns = ['idCliente', 'razonSocial', 'direccion', 'telefono', 'email', 'acciones'];
  dataSource!: MatTableDataSource<Cliente>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar
    
  ) { }

  ngOnInit(): void {

    this.clienteService.listar().subscribe(data => {
      this.crearTabla(data);
    });

    this.clienteService.getClienteCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.clienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  filtrar(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();    
  }

  eliminar(idCliente: number){
    alert("eliminar:"+idCliente)
    this.clienteService.eliminar(idCliente).pipe(switchMap( ()=>{
      return this.clienteService.listar();
    }))
    .subscribe(data => {      
      this.clienteService.setClienteCambio(data);
      this.clienteService.setMensajeCambio('SE ELIMINO');
    });
  }

  crearTabla(data: Cliente[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
