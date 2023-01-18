import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoTareasPageRoutingModule } from './listado-tareas-routing.module';

import { ListadoTareasPage } from './listado-tareas.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoTareasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListadoTareasPage]
})
export class ListadoTareasPageModule {}
