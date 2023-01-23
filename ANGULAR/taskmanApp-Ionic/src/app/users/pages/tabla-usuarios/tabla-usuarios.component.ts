import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Usuario} from "../../services/usuarios.service";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent  {

  /**
   * Array de videojuegos que va a renderizarse en la vista.
   */
  @Input() usuarios: Usuario[] = [];

  /**
   * Este evento se ejcuta cuando se quiera borrar una tarea.
   */
  @Output() onBorrar: EventEmitter<number> = new EventEmitter();

  constructor(){}

  /**
   * Método que borra un usuario. Al cual se le pasa un índice para no tener que recorrer la tabla.
   * @param index
   */
  borrarUsuario(index: number): void{
    this.onBorrar.emit(index);
  }

}
