import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FiltroBusquedaComponent } from './shared/filtro-busqueda/filtro-busqueda.component';
import { IonicModule } from '@ionic/angular';

//import * as CanvasJSAngularChart from '../../lib/canvasjs.angular.component';
import { FormsModule } from '@angular/forms';
import { TablaVideojuegosComponent } from './videojuegos/tabla-videojuegos/tabla-videojuegos.component';
import { RouterModule } from '@angular/router';
import { VideojuegosPorEstadoComponent } from "./dashboard/videojuegos-por-estado/videojuegos-por-estado.component";
import { VideojuegosPorTipoComponent } from "./dashboard/videojuegos-por-tipo/videojuegos-por-tipo.component";
import { TablaUsuariosComponent } from "./usuarios/tabla-usuarios/tabla-usuarios.component";

import {CanvasJSChart} from "../../lib/canvasjs.angular.component";
import {UsuariosPorRolComponent} from "./dashboard/usuarios-por-rol/usuarios-por-rol.component";


@NgModule({
  declarations: [
    CanvasJSChart,
    HeaderComponent,
    VideojuegosPorEstadoComponent ,
    VideojuegosPorTipoComponent,
    UsuariosPorRolComponent,
    FiltroBusquedaComponent,
    TablaVideojuegosComponent,
    TablaUsuariosComponent
  ],
  exports: [
    HeaderComponent,
    CanvasJSChart,
    VideojuegosPorEstadoComponent,
    VideojuegosPorTipoComponent,
    UsuariosPorRolComponent,
    FiltroBusquedaComponent,
    TablaVideojuegosComponent,
    TablaUsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
