import { CortadorComponent } from './pages/cortador/cortador.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { TelaComponent } from './pages/tela/tela.component';
import { TelaEdicionComponent } from './pages/tela/tela-edicion/tela-edicion.component';

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
  { path: 'cortador', component: CortadorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
