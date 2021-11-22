import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  edicion!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'id': new FormControl(0),
      'razonSocial': new FormControl(''),
      'telefono': new FormControl(''),
      'direccion': new FormControl(''),
      'email': new FormControl(''),
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if (this.edicion) {
      this.clienteService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idCliente),
          'razonSocial': new FormControl(data.razonSocial),
          'direccion': new FormControl(data.direccion),
          'telefono': new FormControl(data.telefono),
          'email': new FormControl(data.email)
        });
      });
    }
  }

  operar() {
    let cliente = new Cliente();
    cliente.idCliente = this.form.value['id'];
    cliente.razonSocial = this.form.value['razonSocial'];
    cliente.direccion = this.form.value['direccion'];
    cliente.telefono = this.form.value['telefono'];
    cliente.email = this.form.value['email'];

    if (this.edicion) {
      //MODIFICAR
      this.clienteService.modificar(cliente).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.setClienteCambio(data);
          this.clienteService.setMensajeCambio('SE MODIFICO');
        });
      });
    } else {
      //REGISTRAR
      alert(cliente.email)
      this.clienteService.registrar(cliente).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.setClienteCambio(data);
          this.clienteService.setMensajeCambio('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['cliente']);

  }



}
