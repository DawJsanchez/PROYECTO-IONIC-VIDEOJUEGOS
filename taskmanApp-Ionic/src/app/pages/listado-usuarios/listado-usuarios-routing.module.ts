import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoUsuariosPage} from './listado-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoUsuariosRoutingModule {}
