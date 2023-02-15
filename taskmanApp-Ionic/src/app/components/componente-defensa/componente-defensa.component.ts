import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Videojuego} from "../../interfaces/videojuego.interface";

@Component({
  selector: 'app-componente-defensa',
  templateUrl: './componente-defensa.component.html',
  styleUrls: ['./componente-defensa.component.scss'],
})
export class ComponenteDefensaComponent {

  //@Input() btnCaption: ;

  @Output() btnDefensa: EventEmitter<number> = new EventEmitter();

  constructor() { }

}
