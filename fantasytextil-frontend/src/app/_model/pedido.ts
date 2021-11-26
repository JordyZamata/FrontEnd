import { Cliente } from "./cliente";
import { DetallePedido } from "./detallePedido";
import { Tela } from "./tela";

export class Pedido {
    idPedido!: number;
    tela!: Tela;
    cliente!: Cliente;
    fecha!: string; //2020-11-07T11:30:05 ISODate || moment.js
    detallePedidoConsulta!: DetallePedido[];
}








