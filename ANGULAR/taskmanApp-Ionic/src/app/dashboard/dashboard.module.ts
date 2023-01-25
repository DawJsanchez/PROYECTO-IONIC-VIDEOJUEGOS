import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideojuegosPorEstadoComponent } from './components/videojuegos-por-estado/videojuegos-por-estado.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosPorRolComponent } from './components/usuarios-por-rol/usuarios-por-rol.component';
import { VideojuegosPorTipoComponent } from './components/videojuegos-por-tipo/videojuegos-por-tipo.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CanvasJSChart } from 'src/lib/canvasjs.angular.component';



@NgModule({
  declarations: [
    CanvasJSChart,
    VideojuegosPorEstadoComponent,
    DashboardComponent,
    UsuariosPorRolComponent,
    VideojuegosPorTipoComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
