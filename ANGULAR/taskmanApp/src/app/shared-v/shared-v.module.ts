import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatalistComponent } from './components/datalist/datalist.component';
import { FiltroBusquedaComponent } from './components/filtro-busqueda/filtro-busqueda.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DatalistComponent,
    FiltroBusquedaComponent,
    MenuComponent,
  ],
  exports: [
    DatalistComponent,
    FiltroBusquedaComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedVModule { }
