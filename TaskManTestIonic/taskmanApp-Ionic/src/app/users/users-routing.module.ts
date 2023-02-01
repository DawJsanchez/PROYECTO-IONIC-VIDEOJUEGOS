import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListadoPage} from "./pages/listado/listado.page";
import {EditarComponent} from "./pages/editar/editar.component";
import {VerPage} from "./pages/ver/ver.page";

const routes: Routes = [
  {
    // La cadena vacía identifica al ROOT
    path: '',
    children: [
      {
        path: 'listado',
        component: ListadoPage
      },
      {
        path: 'agregar',
        component: EditarComponent
      },
      {
        // Hace match para editar/XXXX donde XXXX es el id de usuario
        // Desde el componente se puede capturar ese ID
        path: 'editar/:id',
        component: EditarComponent
      },
      {
        // Ver un usuario
        path: 'ver/:id',
        component: VerPage
      },
      // {
      //   // Hace match para /XXXX donde XXXX es el id de usuario
      //   // desde el componente se captura y se puede mostrar
      //   // el usuario
      //   path: ':id',
      //   component: VerPage
      // },
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
export class UsersRoutingModule {
}
