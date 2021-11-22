import { Cliente } from './../../_model/cliente';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from 'src/app/_service/cliente.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {


  displayedColumns = ['idCliente', 'razonSocial', 'direccion', 'telefono', 'email', 'acciones'];
  dataSource!: MatTableDataSource<Cliente>;

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.clienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.clienteService.getClienteCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.clienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });



  }
}
