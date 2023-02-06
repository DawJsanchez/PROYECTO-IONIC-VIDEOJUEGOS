import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditarVideojuegoPage} from "./editar-videojuego.page";



const routes: Routes = [
  {
    path: '',
    component: EditarVideojuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarVideojuegoPageRoutingModule {}
