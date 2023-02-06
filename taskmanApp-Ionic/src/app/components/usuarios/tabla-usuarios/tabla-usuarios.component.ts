import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Usuario} from "../../../interfaces/usuario.interface";

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss'],
})
export class TablaUsuariosComponent {

 //ARRAY DE USUARIOS A CARGAR
  @Input() usuarios: Usuario[] = [];

  /*
   * EventEmitter desde este componente cuando se quiera borrar
   */
  @Output() onBorrar: EventEmitter<number> = new EventEmitter();

  constructor() { }

  //Borrar usuario por indice
  borrarUsuario(indice: number): void {
    this.onBorrar.emit(indice);
  }

}
