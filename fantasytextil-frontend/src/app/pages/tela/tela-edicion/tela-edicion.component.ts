import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Tela } from 'src/app/_model/tela';
import { TelaService } from 'src/app/_service/tela.service';

@Component({
  selector: 'app-tela-edicion',
  templateUrl: './tela-edicion.component.html',
  styleUrls: ['./tela-edicion.component.css']
})
export class TelaEdicionComponent implements OnInit {

  id!: number;
  tela!: Tela;
  form!: FormGroup;
  edicion: boolean = false;


  constructor(
    private telaService: TelaService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.tela = new Tela();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'color': new FormControl(''),
      'estilo': new FormControl(''),
      'peso': new FormControl(0)
    });


    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.telaService.listarPorId(this.id).subscribe(data => {
        console.log(data)
        let id = data.idTela;
        let color = data.color;
        let estilo = data.estilo;
        let peso = data.peso;

        this.tela.idTela = this.form.value['id'];
        this.tela.color = this.form.value['color'];
        this.tela.estilo = this.form.value['estilo'];
        this.tela.peso = this.form.value['peso'];

        this.form = new FormGroup({
          'id': new FormControl(id),
          'color': new FormControl(color),
          'estilo': new FormControl(estilo),
          'peso': new FormControl(peso)
        });
      });
    }
  }

  operar() {

  
    this.tela.idTela = this.form.value['id'];
    this.tela.color = this.form.value['color'];
    this.tela.estilo = this.form.value['estilo'];
    this.tela.peso = this.form.value['peso'];

    if (this.tela != null && this.tela.idTela > 0) {
      //BUENA PRACTICA
      this.telaService.modificar(this.tela).pipe(switchMap(() => {
        return this.telaService.listar();
      })).subscribe(data => {
        this.telaService.setTelaCambio(data);
        this.telaService.setMensajeCambio("Se modifico");
      });
    } else {
      //PRACTICA COMUN
      this.telaService.registrar(this.tela).subscribe(data => {
        this.telaService.listar().subscribe(especialidad => {
          this.telaService.setTelaCambio(especialidad);
          this.telaService.setMensajeCambio("Se registro");
        });
      });
    }

    this.router.navigate(['tela']);
  }


}
