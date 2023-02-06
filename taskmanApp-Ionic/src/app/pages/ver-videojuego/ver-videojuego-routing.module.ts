import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerVideojuegoPage } from './ver-videojuego.page';

const routes: Routes = [
  {
    path: '',
    component: VerVideojuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerVideojuegoPageRoutingModule {}
