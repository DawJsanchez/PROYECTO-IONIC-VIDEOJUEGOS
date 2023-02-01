import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AutenticacionGuard} from "./auth/guards/autenticacion.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'usuarios/listado',
    loadChildren: () => import('./users/pages/listado/listado.module').then( m => m.ListadoPageModule),
    canLoad:[AutenticacionGuard],
    canActivate:[AutenticacionGuard]

  },
  {
    path: 'videojuegos/listado',
    loadChildren: () => import('./videojuegos/pages/listado/listado.module').then( m => m.ListadoPageModule),
//    canLoad:[AutenticacionGuard],
//    canActivate:[AutenticacionGuard]
  },
  {
    // Módulo de autenticación
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
