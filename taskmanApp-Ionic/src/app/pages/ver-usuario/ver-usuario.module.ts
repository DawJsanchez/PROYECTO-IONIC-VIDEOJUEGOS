import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/components/components.module';
import {VerUsuarioPage} from "./ver-usuario.page";
import {VerUsuarioPageRoutingModule} from "./ver-usuario-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VerUsuarioPageRoutingModule
  ],
  declarations: [VerUsuarioPage]
})
export class VerUsuarioPageModule {}
