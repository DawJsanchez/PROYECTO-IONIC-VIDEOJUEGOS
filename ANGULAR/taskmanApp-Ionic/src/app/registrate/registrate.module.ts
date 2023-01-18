import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistratePageRoutingModule } from './registrate-routing.module';

import { RegistratePage } from './registrate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
ReactiveFormsModule,
    IonicModule,
    RegistratePageRoutingModule
  ],
  declarations: [RegistratePage]
})
export class RegistratePageModule {}
