import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTareaPageRoutingModule } from './editar-tarea-routing.module';

import { EditarTareaPage } from './editar-tarea.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [EditarTareaPage],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        EditarTareaPageRoutingModule,
        ComponentsModule
    ]
})
export class EditarTareaPageModule {}
