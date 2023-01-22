import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoVideojuego } from '../../interfaces/videojuego-tipo.interface';

@Component({
  selector: 'app-tabla-tipos-videojuego',
  templateUrl: './tabla-tipos-videojuego.component.html',
  styleUrls: ['./tabla-tipos-videojuego.component.scss'],
})
export class TablaTiposVideojuegoComponent {
  
  /**
   * Array de videojuegos que va a renderizarse en la vista.
   */
  @Input() tiposVideojuego: TipoVideojuego[] = [];

  /**
   * Este evento se ejcuta cuando se quiera borrar una tarea.
   */
  @Output() onBorrar: EventEmitter<number> = new EventEmitter();

  constructor() { }

  /**
   * Método que borra un usuario. Al cual se le pasa un índice para no tener que recorrer la tabla.
   * @param index 
   */
  borrarTiposVideojuego(index: number): void{
    this.onBorrar.emit(index);
  }

}
