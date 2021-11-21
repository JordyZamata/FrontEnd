import { CortadorComponent } from './pages/cortador/cortador.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cliente', component: ClienteComponent, children: [
      //{ path: 'nuevo', component: ClienteEdicionComponent },
      //{ path: 'edicion/:id', component: PacienteEdicionComponent }
    ]
  },
  { path: 'cortador', component: CortadorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
