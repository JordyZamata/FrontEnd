import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PedidoListaCortadorDTO } from '../_dto/pedidoListaCortadorDTO';
import { Pedido } from '../_model/pedido';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends GenericService<Pedido>{

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/pedidos`
    )
  }
  
  registrarTransaccion(pedidoDTO: PedidoListaCortadorDTO) {
    return this.http.post(this.url, pedidoDTO);
  }
}
