import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ListadoVideojuegosPage } from './listado-videojuegos.page';
import { ComponentsModule } from '../../components/components.module';
import {ListadoVideojuegosRoutingModule} from "./listado-videojuegos-routing.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoVideojuegosRoutingModule,
    ComponentsModule
  ],
  declarations: [ListadoVideojuegosPage]
})
export class ListadoVideojuegosPageModule {}
