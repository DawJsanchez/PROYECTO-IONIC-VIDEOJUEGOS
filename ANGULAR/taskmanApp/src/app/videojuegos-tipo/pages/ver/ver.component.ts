import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { DialogService } from 'src/app/shared-v/services/dialog.service';
import { TipoVideojuego } from '../../interfaces/videojuego-tipo.interface';
import { TiposVideojuegoService } from '../../services/tipos-videojuego.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  tiposVideojuego! : TipoVideojuego;  

//-------------------------------------------------------------------------------------
// Inicialización
//-------------------------------------------------------------------------------------

constructor(

  private activatedRoute    : ActivatedRoute,
  private router            : Router,

  private dialogService     : DialogService,
  private tiposVideojuegoService     : TiposVideojuegoService

) { }

/**
 * Inicialización de la página
 */
ngOnInit(): void {

  // Carga el usuario
  this.cargarTiposVideojuego();

}


//-------------------------------------------------------------------------------------
// Funciones de persistencia. Permiten guardar y recuperar usuario
//-------------------------------------------------------------------------------------

/**
 * Cuando estamos editando, este método carga el usuario que estamos editando en el formulario
 */
 cargarTiposVideojuego() {
    
  // Si estamos en modo edición, obtiene los parámeros
  // y carga los datos
  this.activatedRoute.params
    
    // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
    // por el usuario
    .pipe(

        switchMap( ({id}) => this.tiposVideojuegoService.getTiposVideojuegoPorId(id) ),
        
        // Este pipe muestra lo que viene
        tap(console.log)
    )
    // Finalmente, este subscribe recibe el resultado, que será el objeto
    .subscribe({      

        // Reciebe el siguiente valor
        next: (tipoVideojuego: TipoVideojuego) =>  {

          // Carga los datos
          this.tiposVideojuego = tipoVideojuego;

          // Muestra el usuario en el log
          console.log(tipoVideojuego);
        },

        // El observer ha recibido una notificación completa
        complete: () => {     
        },

        // El observer ha recibido un error
        error: (error) => {

          // Muestra un mensaje de error
          this.dialogService.mostrarToast('No ha sido posible cargar el tipoVideojuego: '+ error);

          // Redirige al listado
          this.router.navigate([ '/tipos-videojuego/listado' ]);

          // Muestra el error por consola
          console.log(error);
        }
        
    });      
  }

}
