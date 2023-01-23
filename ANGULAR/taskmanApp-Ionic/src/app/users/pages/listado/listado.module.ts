import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListadoPageRoutingModule } from './listado-routing.module';
import { ListadoPage } from './listado.page';
import {TablaUsuariosComponent} from "../tabla-usuarios/tabla-usuarios.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPageRoutingModule
  ],
  declarations: [ListadoPage, TablaUsuariosComponent]
})
export class ListadoPageModule {}
