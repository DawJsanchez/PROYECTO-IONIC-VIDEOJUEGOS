import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

// Es un array de Route.
// https://angular.io/api/router/Route
const routes: Routes = [
  {
    // En el AppRouting habrá una entrada que redirija a este módulo
    path: '',
    children: [
      {        
        path: 'login',
        component: LoginComponent
      },
      {
        // Si no entro en ninguna ruta, redirijo al login
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
