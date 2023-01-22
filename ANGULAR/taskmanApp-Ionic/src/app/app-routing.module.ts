import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrate',
    loadChildren: () => import('./registrate/registrate.module').then( m => m.RegistratePageModule)
  },  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'ver',
    loadChildren: () => import('./videojuegos/pages/ver/ver.module').then( m => m.VerPageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./videojuegos/pages/listado/listado.module').then( m => m.ListadoPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./videojuegos/pages/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'ver',
    loadChildren: () => import('./videojuegos/pages/ver/ver.module').then( m => m.VerPageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./videojuegos/pages/listado/listado.module').then( m => m.ListadoPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./videojuegos/pages/editar/editar.module').then( m => m.EditarPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
