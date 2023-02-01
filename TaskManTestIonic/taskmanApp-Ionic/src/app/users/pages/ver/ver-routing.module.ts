import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerPage} from "./ver.page";

const routes: Routes = [
  {
    path: '',
    component: VerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerPageRoutingModule {}
