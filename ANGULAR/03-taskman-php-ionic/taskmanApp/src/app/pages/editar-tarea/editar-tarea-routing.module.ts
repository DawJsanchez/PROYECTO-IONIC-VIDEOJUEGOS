import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTareaPage } from './editar-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTareaPageRoutingModule {}
