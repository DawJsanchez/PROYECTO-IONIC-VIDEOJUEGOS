import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutenticacionGuard } from './guards/autenticacion.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
//    canLoad:[AutenticacionGuard],
//    canActivate:[AutenticacionGuard]
  },
  {
    path: 'listado-tareas',
    loadChildren: () => import('./pages/listado-tareas/listado-tareas.module').then( m => m.ListadoTareasPageModule),
//    canLoad:[AutenticacionGuard],
//    canActivate:[AutenticacionGuard]
  },
  {
    path: 'crear-tarea',
    loadChildren: () => import('./pages/editar-tarea/editar-tarea.module').then( m => m.EditarTareaPageModule),
//    canLoad:[AutenticacionGuard],
//    canActivate:[AutenticacionGuard]
  },  
  {
    path: 'editar-tarea/:id',
    loadChildren: () => import('./pages/editar-tarea/editar-tarea.module').then( m => m.EditarTareaPageModule),
//    canLoad:[AutenticacionGuard],
//    canActivate:[AutenticacionGuard]
  },
  {
    path: 'ver-tarea/:id',
    loadChildren: () => import('./pages/ver-tarea/ver-tarea.module').then( m => m.VerTareaPageModule),
//    canLoad:[AutenticacionGuard],
//    canActivate:[AutenticacionGuard]
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
