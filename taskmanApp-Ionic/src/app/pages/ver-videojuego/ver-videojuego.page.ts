import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Videojuego } from 'src/app/interfaces/videojuego.interface';
import {VideojuegosService} from "../../services/videojuegos.service";

@Component({
  selector: 'app-ver-videojuego',
  templateUrl: './ver-videojuego.page.html',
  styleUrls: ['./ver-videojuego.page.scss'],
})
export class VerVideojuegoPage implements OnInit {


  videojuego! : Videojuego | undefined;

//-------------------------------------------------------------------------------------
// Inicialización
//-------------------------------------------------------------------------------------

constructor(

  private activatedRoute    : ActivatedRoute,
  private router            : Router,

  private videojuegosService     : VideojuegosService

) { }

/**
 * Inicialización de la página
 */
ngOnInit(): void {

  // Carga videojuegos
  this.cargarVideojuego();

}


//-------------------------------------------------------------------------------------
// Funciones de persistencia. Permiten guardar y recuperar tareas
//-------------------------------------------------------------------------------------

/**
 * Cuando estamos editando, este método carga la tarea que estamos editando en el formulario
 */
 cargarVideojuego() {

  // Si estamos en modo edición, obtiene los parámeros
  // y carga los datos
  this.activatedRoute.params

    // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
    // por el videojuego
    .pipe(
        switchMap( ({id}) => this.videojuegosService.getVideojuegoPorId(id) ),

        // Este pipe muestra lo que viene
        tap(console.log)
    )
    // Finalmente, este subscribe recibe el resultado, que será el objeto
    .subscribe(respuesta => {

      if(respuesta.ok) {

        // Carga los datos
        this.videojuego = respuesta.datos;

      } else {
        this.router.navigate([ '/listado-videojuegos' ]);
      }
    });
  }

}
