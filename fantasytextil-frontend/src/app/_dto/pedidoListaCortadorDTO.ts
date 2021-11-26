import { Cortador } from "../_model/cortador";
import { Pedido } from "../_model/pedido";

export class PedidoListaCortadorDTO{
    pedido!: Pedido;
    lstCortador!: Cortador[];
}