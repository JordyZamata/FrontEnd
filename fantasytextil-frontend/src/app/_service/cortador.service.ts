import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cortador } from '../_model/cortador';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CortadorService extends GenericService<Cortador>{

  private cortadorCambio = new Subject<Cortador[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/cortadores`
    );
  }
  /*
  private url = `${environment.HOST}/cortadores`;

  listar(){
    return this.http.get<Cortador[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Cortador>(`${this.url}/${id}`);
  }

  registrar(cortador : Cortador){
    return this.http.post(this.url, cortador);
  }

  modificar(cortador : Cortador){
    return this.http.put(this.url, cortador);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
*/
  //** get set subjects */

  getCortadorCambio(){
    return this.cortadorCambio.asObservable();
  }

  setCortadorCambio(cortadores : Cortador[]){
    this.cortadorCambio.next(cortadores);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }
}
