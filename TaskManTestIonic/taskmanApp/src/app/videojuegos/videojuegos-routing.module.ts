import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent } from './pages/editar/editar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { VerComponent } from './pages/ver/ver.component';

const routes: Routes = [
  {
    // La cadena vacía identifica al ROOT
    path: '',
    children: [
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'agregar',
        component: EditarComponent
      },
      {
        // Hace match para editar/XXXX donde XXXX es el id de videojuego
        // Desde el componente se puede capturar ese ID
        path: 'editar/:id',
        component: EditarComponent
      },
      {
        // Ver una tarea
        path: 'ver/:id',
        component: VerComponent
      },
      {
        // Hace match para /XXXX donde XXXX es el id de videojuego
        // desde el componente se captura y se puede mostrar
        // el videojuego
        path: ':id',
        component: VerComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideojuegosRoutingModule { }
