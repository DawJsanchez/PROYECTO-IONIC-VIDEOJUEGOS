import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/components/components.module';
import {VerVideojuegoPage} from "./ver-videojuego.page";
import {VerVideojuegoPageRoutingModule} from "./ver-videojuego-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VerVideojuegoPageRoutingModule
  ],
  declarations: [VerVideojuegoPage]
})
export class VerVideojuegoPageModule {}
