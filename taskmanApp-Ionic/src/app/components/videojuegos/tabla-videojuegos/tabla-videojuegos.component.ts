import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
 import {Videojuego} from "../../../interfaces/videojuego.interface";
@Component({
  selector: 'app-tabla-videojuegos',
  templateUrl: './tabla-videojuegos.component.html',
  styleUrls: ['./tabla-videojuegos.component.scss'],
})
export class TablaVideojuegosComponent {

  //Array de videojuegos
  @Input() videojuegos: Videojuego[] = [];

  /*
   * EventEmitter  desde este componente cuando se quiera eliminar un juego
   */
  @Output() onBorrar: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  //Borra pasado un parametro indice
  borrarVideojuego(indice: number): void {
    this.onBorrar.emit(indice);
  }


}
