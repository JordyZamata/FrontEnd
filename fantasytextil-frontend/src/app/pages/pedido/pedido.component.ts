import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { Cortador } from 'src/app/_model/cortador';
import { Corte } from 'src/app/_model/corte';
import { DetallePedido } from 'src/app/_model/detallePedido';
import { Tela } from 'src/app/_model/tela';
import { ClienteService } from 'src/app/_service/cliente.service';
import { CortadorService } from 'src/app/_service/cortador.service';
import { CorteService } from 'src/app/_service/corte.service';
import { PedidoService } from 'src/app/_service/pedido.service';
import { TelaService } from 'src/app/_service/tela.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  clientes !: Cliente[];
  clientes$!: Observable<Cliente[]>;
  cortadores$!: Observable<Cortador[]>;
  corte$!: Observable<Corte[]>;
  tela$!: Observable<Tela[]>;

  idClienteSeleccionado!: number;
  idCortadorSeleccionado!: number;
  idCorteSeleccionado!: number;
  idTelaSeleccionado!: number;

  maxFecha: Date = new Date();
  fechaSeleccionada:Date = new Date();

  constructor(
    private clienteService : ClienteService,
    private pedidoService : PedidoService,
    private telaService : TelaService,
    private cortadorService : CortadorService,
    private corteService: CorteService,
    private snackBar : MatSnackBar
  ) { 

  }
  ngOnInit(): void {
    //this.listarClientes();
    this.clientes$ = this.clienteService.listar();
    this.cortadores$ = this.cortadorService.listar();
    this.corte$ = this.corteService.listar();
    this.tela$ = this.telaService.listar();
  }

  listarClientes(){



  }
  /***************************************************** */
  verdad: boolean = false;
  corte!: Corte;
  
  contador: number = 1;
  detallePedido!: Array<DetallePedido>[];


  proporcion!: string;
  ancho!: number;
  paños!: number;
  lagor_paño!: number;
  peso_paño!: number;
  totalKG!: number
 
  editField!: string;

    personList: Array<any> = [
      { id: 1, corte: 0,tallaS: "", tallaM: '', tallaL: "", tallaXS: '', tallaXL: '', talla1X: '',
       talla2X: '',talla4X: '', totalCorte: '', ratioS: '', ratioM: '', ratioL: '', ratioXS: '',
      ratioXL: '', ratio1X: '', ratio2X: '', ratio3X: '', partida: '',
      proporcion: ' ',ancho: 0,panos: 0,largo_pano: 0,peso_pano: 0,totalKG: 0}
    ];


    awaitingPersonList: Array<any> = [
      { id: 1, corte: 0,tallaS: "", tallaM: '', tallaL: "", tallaXS: '', tallaXL: '', talla1X: '',
       talla2X: '',talla4X: '', totalCorte: '', ratioS: '', ratioM: '', ratioL: '', ratioXS: '',
      ratioXL: '', ratio1X: '', ratio2X: '', ratio3X: '', partida: '',
      proporcion: ' ',ancho: 0,panos: 0,largo_pano: 0,peso_pano: 0,totalKG: 0}
    ];
    

    
    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.personList[id][property] = editField;




    }

    remove(id: any) {
      this.awaitingPersonList.push(this.personList[id]);
      this.personList.splice(id, 1);
    }

    add() {
      if (this.awaitingPersonList.length > 0) {
        
        this.contador +=1;

        this.personList.push({ id: this.contador, corte: 0,tallaS: "", tallaM: '', tallaL: "", tallaXS: '', tallaXL: '', talla1X: '',
        talla2X: '',talla4X: '', totalCorte: '', ratioS: '', ratioM: '', ratioL: '', ratioXS: '',
       ratioXL: '', ratio1X: '', ratio2X: '', ratio3X: '', partida: '',
       proporcion: ' ',ancho: 0,panos: 0,lago_pano: 0,peso_pano: 0,totalKG: 0});
        
        //this.awaitingPersonList.splice(0, 1);
      }
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

    agregar(){
      console.log(this.personList);
    }


}
