import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {    
    path: '',

    // El raíz nos va a mostrar el dashboard
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        // Si no entro en ninguna ruta, redirijo al login
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
