import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoTareasPage } from './listado-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoTareasPageRoutingModule {}
