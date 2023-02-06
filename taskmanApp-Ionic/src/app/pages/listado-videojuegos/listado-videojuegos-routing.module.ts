import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoVideojuegosPage} from './listado-videojuegos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoVideojuegosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoVideojuegosRoutingModule {}
