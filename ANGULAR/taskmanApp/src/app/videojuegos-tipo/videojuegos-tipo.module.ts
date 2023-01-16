import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideojuegosTipoRoutingModule } from './videojuegos-tipo-routing.module';
import { VerComponent } from './pages/ver/ver.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { TablaTiposVideojuegoComponent } from './components/tabla-tipos-videojuego/tabla-tipos-videojuego.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedVModule } from '../shared-v/shared-v.module';


@NgModule({
  declarations: [
    VerComponent,
    EditarComponent,
    ListadoComponent,
    TablaTiposVideojuegoComponent
  ],
  imports: [
    CommonModule,
    VideojuegosTipoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedVModule
  ]
})
export class VideojuegosTipoModule { }
