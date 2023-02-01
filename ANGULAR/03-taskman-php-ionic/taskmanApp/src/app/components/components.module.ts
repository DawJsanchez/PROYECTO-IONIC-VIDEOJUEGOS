import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TareasPorEstadoComponent } from './dashboard/tareas-por-estado/tareas-por-estado.component';
import { FiltroBusquedaComponent } from './shared/filtro-busqueda/filtro-busqueda.component';
import { IonicModule } from '@ionic/angular';

import * as CanvasJSAngularChart from '../../lib/canvasjs.angular.component';
import { FormsModule } from '@angular/forms';
import { TablaTareasComponent } from './tasks/tabla-tareas/tabla-tareas.component';
import { RouterModule } from '@angular/router';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
  declarations: [
    CanvasJSChart,
    HeaderComponent,
    TareasPorEstadoComponent,
    FiltroBusquedaComponent,
    TablaTareasComponent
  ],
  exports: [
    HeaderComponent,
    TareasPorEstadoComponent,
    FiltroBusquedaComponent,
    TablaTareasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
