import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerTareaPageRoutingModule } from './ver-tarea-routing.module';

import { VerTareaPage } from './ver-tarea.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VerTareaPageRoutingModule
  ],
  declarations: [VerTareaPage]
})
export class VerTareaPageModule {}
