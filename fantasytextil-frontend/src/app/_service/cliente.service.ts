import { Cliente } from '../_model/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {



  private clienteCambio = new Subject<Cliente[]>();
  private mensajeCambio = new Subject<string>();

  private url = `${environment.HOST}/clientes`;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Cliente[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  registrar(clientes : Cliente){
    return this.http.post(this.url, clientes);
  }

  modificar(clientes : Cliente){
    return this.http.put(this.url, clientes);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

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
