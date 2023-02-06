import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {EditarUsuarioPageRoutingModule} from './editar-usuario-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';
import {EditarUsuarioPage} from "./editar-usuario.page";

@NgModule({
    declarations: [EditarUsuarioPage],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        EditarUsuarioPageRoutingModule,
        ComponentsModule
    ]
})
export class EditarUsuarioPageModule {}
