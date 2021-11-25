import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../_model/cliente';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente> {

  private clienteCambio = new Subject<Cliente[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/clientes`
    );
  }  

  /* ANTES DEL GENERIC SERVICE

  //private url = `${environment.HOST}/clientes`;

  listar(){
    return this.http.get<Cliente[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  registrar(cliente : Cliente){
    return this.http.post(this.url, cliente);
  }

  modificar(cliente : Cliente){
    return this.http.put(this.url, cliente);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }*/

  //** get set subjects */

  getClienteCambio(){
    return this.clienteCambio.asObservable();
  }

  setClienteCambio(clientes : Cliente[]){
    this.clienteCambio.next(clientes);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

}
