import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tela } from '../_model/tela';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TelaService extends GenericService<Tela>{

  private telaCambio = new Subject<Tela[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/telas`);
  }

   //get Subjects
   getTelaCambio() {
    return this.telaCambio.asObservable();
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  //set Subjects
  setTelaCambio(telas: Tela[]) {
    this.telaCambio.next(telas);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
