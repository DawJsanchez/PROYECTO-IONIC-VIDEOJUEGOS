import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ListadoUsuariosPage } from './listado-usuarios.page';
import { ComponentsModule } from '../../components/components.module';
import {ListadoUsuariosRoutingModule} from "./listado-usuarios-routing.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoUsuariosRoutingModule,
    ComponentsModule
  ],
  declarations: [ListadoUsuariosPage]
})
export class ListadoUsuariosPageModule {}
