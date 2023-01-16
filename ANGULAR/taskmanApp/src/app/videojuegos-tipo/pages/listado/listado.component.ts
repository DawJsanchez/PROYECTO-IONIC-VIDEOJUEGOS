import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { DialogService } from 'src/app/shared-v/services/dialog.service';
import { TipoVideojuego } from '../../interfaces/videojuego-tipo.interface';
import { TiposVideojuegoService } from '../../services/tipos-videojuego.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  // Lista de usuarios
  tiposVideojuego: TipoVideojuego[] = [];

  constructor(
        
    // Servicio para mostrar diálogos
    private dialogService: DialogService,

    // Acceso al backend
    private tiposVideojuegoService: TiposVideojuegoService,
    
  ) {}

  ngOnInit(): void {

    // Carga los usuarios
    this.cargarTiposVideojuego();
  }

  /**
   *  Método a invocar para lanzar la búsqueda 
   */   
  buscar(termino: string): void {
   
    // Aquí se hace la búsqueda por el término de búsqueda
    this.cargarTiposVideojuego(termino);
  }


  /**
   * 
   * @param filtro Método para cargar los usuarios
   * 
   */
  private cargarTiposVideojuego(filtro: string | undefined = undefined) {
    
    // Cuando la pantalla se muestra se tienen que mostrar los videojuegos.
    this.tiposVideojuegoService.getTiposVideojuegoPorNombre(filtro)

      .pipe(

        // Este tap lo hago solo para mostrar los datos que pasan por aquí
        tap(console.log)
      )
      
      .subscribe({      

          // Reciebe el siguiente valor
          next: (tiposVideojuego: TipoVideojuego[]) =>  {
  
            // Carga los datos
            this.tiposVideojuego = tiposVideojuego;
  
            // Muestra el videojuego en el log
            console.log('Cargados tipos: '+tiposVideojuego.length);
          },
  
          // El observer ha recibido una notificación completa
          complete: () => {     
          },
  
          // El observer ha recibido un error
          error: (error: any) => {
  
            // Muestra un mensaje de error
            this.dialogService.mostrarMensaje('No ha sido posible cargar los tipos: '+ error, 'ERROR');
    
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
  borrarTiposVideojuego(indice: number) {

    // Obtiene el usuario a eliminar
    const tiposVideojuego = this.tiposVideojuego[indice];
 
    // Si el usuario me confirma que quiere eliminar el videojuego, la elimina
    this.dialogService.solicitarConfirmacion(`¿Está seguro de que quiere eliminar el tipo: ${tiposVideojuego.nombre}?`, 'Atención',
      () => {

        // Elimina el usuario
        this.tiposVideojuegoService.borrarTiposVideojuego(tiposVideojuego).subscribe({

          // Reciebe el siguiente valor
          next: (respuesta: any) =>  {
   
            // Elimina el usuario del array
            this.tiposVideojuego.splice(indice, 1);

            // Muestra el usuario en el log
            console.log('Tipo eliminado : '+tiposVideojuego.id);
          },
  
          // El observer ha recibido una notificación completa
          complete: () => {    
            this.dialogService.mostrarToast("Tipo Videojuego eliminado"); 
          },
  
          // El observer ha recibido un error
          error: (error: any) => {
  
            // Muestra un mensaje de error
            this.dialogService.mostrarMensaje('No ha sido posible eliminar el tipo '+ error, 'ERROR');
    
            // Muestra el error por consola
            console.log(error);
          }        
        });
      }
    );
  }

}
