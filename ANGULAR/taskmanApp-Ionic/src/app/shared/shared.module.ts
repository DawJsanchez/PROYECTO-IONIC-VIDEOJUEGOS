import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatalistComponent } from './components/datalist/datalist.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DatalistComponent
  ],
  exports: [
    DatalistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedVModule { }
