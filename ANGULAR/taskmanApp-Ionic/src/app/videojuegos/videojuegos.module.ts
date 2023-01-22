import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaVideojuegosComponent } from './components/tabla-videojuegos/tabla-videojuegos.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { VerComponent } from './pages/ver/ver.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { VideojuegosRoutingModule } from './videojuegos-routing.module';



@NgModule({
  declarations: [
    TablaVideojuegosComponent,
    EditarComponent,
    ListadoComponent,
    VerComponent,  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    VideojuegosRoutingModule,

  ]
})
export class VideojuegosModule { }
