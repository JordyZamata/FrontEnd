import { CortadorComponent } from './pages/cortador/cortador.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { TelaComponent } from './pages/tela/tela.component';
import { TelaEdicionComponent } from './pages/tela/tela-edicion/tela-edicion.component';
import { CorteComponent } from './pages/corte/corte.component';
import { CorteEdicionComponent } from './pages/corte/corte-edicion/corte-edicion.component';

const routes: Routes = [
  {
    path: 'cliente', component: ClienteComponent, children: [
      { path: 'nuevo', component: ClienteEdicionComponent },
      { path: 'edicion/:id', component: ClienteEdicionComponent }
    ]
  },  
  {
    path: 'tela', component: TelaComponent, children: [
      { path: 'nuevo', component: TelaEdicionComponent },
      { path: 'edicion/:id', component: TelaEdicionComponent }
    ]
  },
  {
    path: 'corte', component: CorteComponent, children: [
      { path: 'nuevo', component: CorteEdicionComponent },
      { path: 'edicion/:id', component: CorteEdicionComponent }
    ]
  },
  { path: 'cortador', component: CortadorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
