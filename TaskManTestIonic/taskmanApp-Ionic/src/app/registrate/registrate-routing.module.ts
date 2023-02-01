import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistratePage } from './registrate.page';

const routes: Routes = [
  {
    path: '',
    component: RegistratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistratePageRoutingModule {}
