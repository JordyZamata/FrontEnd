import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CortadorComponent } from './pages/cortador/cortador.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { CortadorDialogoComponent } from './pages/cortador/cortador-dialogo/cortador-dialogo.component';
import { TelaComponent } from './pages/tela/tela.component';
import { TelaEdicionComponent } from './pages/tela/tela-edicion/tela-edicion.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    CortadorComponent,
    ClienteEdicionComponent,
    CortadorDialogoComponent,
    TelaComponent,
    TelaEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
