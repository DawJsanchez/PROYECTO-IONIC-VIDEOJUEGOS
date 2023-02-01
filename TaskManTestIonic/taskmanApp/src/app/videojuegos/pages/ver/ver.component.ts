import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { DialogService } from 'src/app/shared-v/services/dialog.service';
import { Videojuego } from '../../interfaces/videojuego.interface';
import { VideojuegosSpringService } from '../../services/videojuegos-spring.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  videojuego! : Videojuego;  

//-------------------------------------------------------------------------------------
// Inicialización
//-------------------------------------------------------------------------------------

constructor(

  private activatedRoute    : ActivatedRoute,
  private router            : Router,

  private dialogService     : DialogService,
  private videojuegosService     : VideojuegosSpringService

) { }

/**
 * Inicialización de la página
 */
ngOnInit(): void {

  // Carga el videojuego
  this.cargarVideojuego();

}


//-------------------------------------------------------------------------------------
// Funciones de persistencia. Permiten guardar y recuperar videojuegos
//-------------------------------------------------------------------------------------

/**
 * Cuando estamos editando, este método carga el videojuego que estamos editando en el formulario
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
    .subscribe({      

        // Reciebe el siguiente valor
        next: (videojuego: Videojuego) =>  {

          // Carga los datos
          this.videojuego = videojuego;

          // Muestra el videojuego en el log
          console.log(videojuego);
        },

        // El observer ha recibido una notificación completa
        complete: () => {     
        },

        // El observer ha recibido un error
        error: (error) => {

          // Muestra un mensaje de error
          this.dialogService.mostrarToast('No ha sido posible cargar el videojuego: '+ error);

          // Redirige al listado
          this.router.navigate([ '/videojuegos/listado' ]);

          // Muestra el error por consola
          console.log(error);
        }
        
    });      
  }
}
