import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Corte } from '../_model/corte';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CorteService extends GenericService<Corte>{

  private corteCambio = new Subject<Corte[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/cortes`);
  }

  //get Subjects
  getCorteCambio() {
    return this.corteCambio.asObservable();
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  //set Subjects
  setCorteCambio(especialdades: Corte[]) {
    this.corteCambio.next(especialdades);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
