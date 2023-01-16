import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionGuard } from './auth/guards/autenticacion.guard';
import { AutenticacionService } from './auth/services/autenticacion.service';

// Defino las rutas raíz. Estoy utilizando carga perezosa de acuerdo con
// https://angular.io/guide/lazy-loading-ngmodules
//
// Es un array de Route.
// https://angular.io/api/router/Route
const routes: Routes = [

  {    
    // Módulo de autenticación
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),    
  },

  {
    // Cuadro de mandos
    path: 'dashboard-v',
    loadChildren: () => import('./dashboard-v/dashboard-v.module').then(m => m.DashboardVModule),
    canLoad:[AutenticacionGuard],
    canActivate:[AutenticacionGuard]
  },

  {
    // Gestión de videojuegos. 
    path: 'videojuegos',
    loadChildren: () => import('./videojuegos/videojuegos.module').then(m => m.VideojuegosModule),
    canLoad:[AutenticacionGuard],
    canActivate:[AutenticacionGuard]
  },

  {
    // Gestión de usuarios. 
    path: 'usuarios',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canLoad:[AutenticacionGuard],
    canActivate:[AutenticacionGuard]
  },

  {
    // Gestión de tipo-videojuegos. 
    path: 'tipos-videojuego',
    loadChildren: () => import('./videojuegos-tipo/videojuegos-tipo.module').then(m => m.VideojuegosTipoModule),
    canLoad:[AutenticacionGuard],
    canActivate:[AutenticacionGuard]
  },

  {
    // La ruta por defecto reenvía a la página principal
    path: '**',
    redirectTo: 'dashboard-v'
  }
];

@NgModule({

  // Esto importa las rutas configuradas
  imports: [RouterModule.forRoot(routes)],
  
  // Al exportar esto aquí, lo hago público a toda la aplicación
  exports: [RouterModule]
})
export class AppRoutingModule { }
