import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AutenticacionGuard} from "./guards/autenticacion.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
   // canLoad:[AutenticacionGuard],
   canActivate:[AutenticacionGuard]
  },
  {
    path: 'listado-usuarios',
    loadChildren: () => import('./pages/listado-usuarios/listado-usuarios.module').then( m => m.ListadoUsuariosPageModule),
//    canLoad:[AutenticacionGuard],
   canActivate:[AutenticacionGuard]
  },
  {
    path: 'editar-usuario/:id',
    loadChildren: () => import('./pages/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule),
//    canLoad:[AutenticacionGuard],
   canActivate:[AutenticacionGuard]
  },
  {
    path: 'crear-usuario',
    loadChildren: () => import('./pages/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule),
//    canLoad:[AutenticacionGuard],
//    canActivate:[AutenticacionGuard]
  },
  {
    path: 'ver-usuario/:id',
    loadChildren: () => import('./pages/ver-usuario/ver-usuario.module').then( m => m.VerUsuarioPageModule),
//    canLoad:[AutenticacionGuard],
   canActivate:[AutenticacionGuard]
  },
  {
    path: 'listado-videojuegos',
    loadChildren: () => import('./pages/listado-videojuegos/listado-videojuegos.module').then( m => m.ListadoVideojuegosPageModule),
//    canLoad:[AutenticacionGuard],
   canActivate:[AutenticacionGuard]
  },
  {
    path: 'crear-videojuego',
    loadChildren: () => import('./pages/editar-videojuego/editar-videojuego.module').then( m => m.EditarVideojuegoPageModule),
//    canLoad:[AutenticacionGuard],
   canActivate:[AutenticacionGuard]
  },
  {
    path: 'editar-videojuego/:id',
    loadChildren: () => import('./pages/editar-videojuego/editar-videojuego.module').then( m => m.EditarVideojuegoPageModule),
//    canLoad:[AutenticacionGuard],
   canActivate:[AutenticacionGuard]
  },
  {
    path: 'ver-videojuego/:id',
    loadChildren: () => import('./pages/ver-videojuego/ver-videojuego.module').then( m => m.VerVideojuegoPageModule),
//    canLoad:[AutenticacionGuard],
   canActivate:[AutenticacionGuard]
  },
  {
    path: 'listado',
    loadChildren: () => import('./defensa/listado/listado.module').then( m => m.ListadoPageModule),
    canActivate:[AutenticacionGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
