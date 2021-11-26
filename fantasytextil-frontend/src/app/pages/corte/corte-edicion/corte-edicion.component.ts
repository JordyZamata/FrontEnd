import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Corte } from 'src/app/_model/corte';
import { CorteService } from 'src/app/_service/corte.service';

@Component({
  selector: 'app-corte-edicion',
  templateUrl: './corte-edicion.component.html',
  styleUrls: ['./corte-edicion.component.css']
})
export class CorteEdicionComponent implements OnInit {


  id!: number;
  corte!: Corte;
  form!: FormGroup;
  edicion: boolean = false;

  constructor(
    private corteService: CorteService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.corte = new Corte();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'estilo': new FormControl(''),
      'tipo': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.corteService.listarPorId(this.id).subscribe(data => {
        let id = data.idCorte;
        let estilo = data.estilo;
        let tipo = data.tipo;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'estilo': new FormControl(estilo),
          'tipo': new FormControl(tipo)
        });
      });
    }
  }

  operar() {
    this.corte.idCorte = this.form.value['id'];
    this.corte.estilo = this.form.value['estilo'];
    this.corte.tipo = this.form.value['tipo'];

    if (this.corte != null && this.corte.idCorte > 0) {
      //BUENA PRACTICA
      this.corteService.modificar(this.corte).pipe(switchMap(() => {
        return this.corteService.listar();
      })).subscribe(data => {
        this.corteService.setCorteCambio(data);
        this.corteService.setMensajeCambio("Se modificó");
      });

    } else {
      //PRACTICA COMUN
      this.corteService.registrar(this.corte).subscribe(data => {
        this.corteService.listar().subscribe(corte => {
          this.corteService.setCorteCambio(corte);
          this.corteService.setMensajeCambio("Se registró");
        });
      });
    }

    this.router.navigate(['corte']);
  }
}
