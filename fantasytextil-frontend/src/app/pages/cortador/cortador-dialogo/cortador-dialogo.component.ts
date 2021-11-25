import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Cortador } from 'src/app/_model/cortador';
import { CortadorService } from 'src/app/_service/cortador.service';

@Component({
  selector: 'app-cortador-dialogo',
  templateUrl: './cortador-dialogo.component.html',
  styleUrls: ['./cortador-dialogo.component.css']
})
export class CortadorDialogoComponent implements OnInit {

  cortador!: Cortador;
  
  constructor(
    private dialogRef: MatDialogRef<CortadorDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cortador,
    private cortadorService: CortadorService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.cortador = new Cortador();
    this.cortador = this.data;
    this.cortador.idCortador = this.data.idCortador;
    this.cortador.nombres = this.data.nombres;
    this.cortador.apellidos = this.data.apellidos;
    this.cortador.telefono = this.data.telefono;
    this.cortador.fotoUrl = this.data.fotoUrl;
    this.cortador = this.data;
  }

  operar(){
    if (this.cortador != null && this.cortador.idCortador > 0) {
      //MODIFICAR
      this.cortadorService.modificar(this.cortador).pipe(switchMap( ()=> {
        return this.cortadorService.listar();
      })).subscribe(data => {
        this.cortadorService.setCortadorCambio(data);
        this.cortadorService.setMensajeCambio('SE MODIFICO');
      });
    }else{
      //REGISTRAR
      //REGISTRAR
      this.cortadorService.registrar(this.cortador).pipe(switchMap(() => {
        return this.cortadorService.listar();
      })).subscribe(data => {
        this.cortadorService.setCortadorCambio(data);
        this.cortadorService.setMensajeCambio('SE REGISTRO');
      });      
    }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }

}
