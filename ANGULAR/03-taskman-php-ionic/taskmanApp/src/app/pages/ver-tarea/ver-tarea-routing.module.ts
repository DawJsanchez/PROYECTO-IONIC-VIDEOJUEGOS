import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerTareaPage } from './ver-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: VerTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerTareaPageRoutingModule {}
