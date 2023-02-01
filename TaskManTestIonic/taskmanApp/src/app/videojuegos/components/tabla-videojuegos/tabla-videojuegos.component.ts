import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Videojuego } from '../../interfaces/videojuego.interface';

@Component({
  selector: 'app-tabla-videojuegos',
  templateUrl: './tabla-videojuegos.component.html',
  styleUrls: ['./tabla-videojuegos.component.css']
})
export class TablaVideojuegosComponent {

  /**
   * ARRAY DE VIDEOJUEGOS
   */
  @Input() videojuegos: Videojuego[] = [];

  /**
   * EVENTO QUE SE EJECUTA AL BORRAR UN VIDEOJUEGO
   */
  @Output() onBorrar: EventEmitter<number> = new EventEmitter();

  constructor(){}

  /**
   * METODO QUE BORRA UN VIDEOJUEGO. SE LE PASA UN INDICE PARA NO RECORRER LA TABLA
   * @param index 
   */
  borrarVideojuego(index: number): void{
    this.onBorrar.emit(index);
  }

}
