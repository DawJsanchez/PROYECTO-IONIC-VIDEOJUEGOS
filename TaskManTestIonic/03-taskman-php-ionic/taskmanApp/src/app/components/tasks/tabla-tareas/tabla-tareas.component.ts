import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea.interface';

@Component({
  selector: 'app-tabla-tareas',
  templateUrl: './tabla-tareas.component.html',
  styleUrls: ['./tabla-tareas.component.scss'],
})
export class TablaTareasComponent {

 /**
   * Esto es el array de tareas que se va a renderizar
   */
  @Input() tareas: Tarea[] = [];

  /**
   * Evento que se va a emitir desde este componente cuando se quiera 
   * borrar une tarea
   */
  @Output() onBorrar: EventEmitter<number> = new EventEmitter();

  constructor() { }

  /**
   * Bara borrar tarea se pasa el índice dentro de la tabla de tareas.
   * Más que nada porque luego se evita tener que recorrer la tabla para hacer la eliminación
   * 
   * @param indice 
   */
  borrarTarea(indice: number): void {
    this.onBorrar.emit(indice);
  }

}
