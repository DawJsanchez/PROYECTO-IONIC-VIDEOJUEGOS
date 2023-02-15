import { Component, OnInit } from '@angular/core';
import {Videojuego} from "../../interfaces/videojuego.interface";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  videojuegos: Videojuego[] = [];

  constructor() { }

  ngOnInit() {
  }

}
