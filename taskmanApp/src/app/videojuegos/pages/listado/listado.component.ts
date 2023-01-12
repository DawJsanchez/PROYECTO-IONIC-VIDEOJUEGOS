import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { DialogService } from 'src/app/shared-v/services/dialog.service';
import { Videojuego } from '../../interfaces/videojuego.interface';
import { VideojuegosSpringService } from '../../services/videojuegos-spring.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  // Lista de videojuegos
  videojuegos: Videojuego[] = [];

  constructor(
        
    // Servicio para mostrar diálogos
    private dialogService: DialogService,

    // Acceso al backend
    private videojuegosService: VideojuegosSpringService,
    
  ) {}

  ngOnInit(): void {

    // Carga los videojuegos
    this.cargarVideojuegos();
  }

  /**
   *  Método a invocar para lanzar la búsqueda 
   */   
  buscar(termino: string): void {
   
    // Aquí se hace la búsqueda por el término de búsqueda
    this.cargarVideojuegos(termino);
  }


  /**
   * 
   * @param filtro Método para cargar los videojuegos
   * 
   */
  private cargarVideojuegos(filtro: string | undefined = undefined) {
    
    // Cuando la pantalla se muestra se tienen que mostrar los videojuegos.
    this.videojuegosService.getVideojuegosPorTitulo(filtro)

      .pipe(

        // Este tap lo hago solo para mostrar los datos que pasan por aquí
        tap(console.log)
      )
      
      .subscribe({      

          // Reciebe el siguiente valor
          next: (videojuegos: Videojuego[]) =>  {
  
            // Carga los datos
            this.videojuegos = videojuegos;
  
            // Muestra el videojuego en el log
            console.log('Cargados videojuegos: '+videojuegos.length);
          },
  
          // El observer ha recibido una notificación completa
          complete: () => {     
          },
  
          // El observer ha recibido un error
          error: (error: any) => {
  
            // Muestra un mensaje de error
            this.dialogService.mostrarMensaje('No ha sido posible cargar los videojuegos: '+ error, 'ERROR');
    
            // Muestra el error por consola
            console.log(error);
          }        
      });                
  }

  /**
   * Borrar videojuego recibe el evento. El evento de la tabla de videojuegos emite el ID en la tabla
   * 
   * @param indice 
   */
  borrarVideojuego(indice: number) {

    // Obtiene el videojuego a eliminar
    const videojuego = this.videojuegos[indice];
 
    // Si el usuario me confirma que quiere eliminar el videojuego, la elimina
    this.dialogService.solicitarConfirmacion(`¿Está seguro de que quiere eliminar el videojuego: ${videojuego.titulo}?`, 'Atención',
      () => {

        // Elimina el videojuego
        this.videojuegosService.borrarVideojuego(videojuego).subscribe({

          // Reciebe el siguiente valor
          next: (respuesta: any) =>  {
   
            // Elimina el videojuego del array
            this.videojuegos.splice(indice, 1);

            // Muestra el videojuego en el log
            console.log('Videojuego eliminada : '+videojuego.id);
          },
  
          // El observer ha recibido una notificación completa
          complete: () => {     
          },
  
          // El observer ha recibido un error
          error: (error: any) => {
  
            // Muestra un mensaje de error
            this.dialogService.mostrarMensaje('No ha sido posible eliminar el videojuego '+ error, 'ERROR');
    
            // Muestra el error por consola
            console.log(error);
          }        
        });
      }
    );
  }
}
