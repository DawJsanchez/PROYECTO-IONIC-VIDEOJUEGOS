import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { VerComponent } from './pages/ver/ver.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedVModule } from '../shared-v/shared-v.module';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    TablaUsuariosComponent,
    EditarComponent,
    ListadoComponent,
    VerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedVModule
  ]
})
export class UsersModule { }
