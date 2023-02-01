import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { tap } from 'rxjs';
import { Tarea } from 'src/app/interfaces/tarea.interface';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-listado-tareas',
  templateUrl: './listado-tareas.page.html',
  styleUrls: ['./listado-tareas.page.scss'],
})
export class ListadoTareasPage implements OnInit {

  // Lista de tareas
  tareas: Tarea[] = [];

  constructor(
        
    // Servicio para mostrar diálogos
    private alertController: AlertController,

    // Acceso al backend
    private tareasService: TareasService
    
    ) {}

  ngOnInit(): void {

    // Carga las tareas
    this.cargarTareas();
  }

  /**
   *  Método a invocar para lanzar la búsqueda 
   */   
  buscar(termino: string): void {
  
    // Aquí se hace la búsqueda por el término de búsqueda
    this.cargarTareas(termino);
  }


  /**
   * 
   * @param filtro Método para cargar las tareas
   * 
   */
  private cargarTareas(filtro: string | undefined = undefined) {
    
    // Cuando la pantalla se muestra se tienen que mostrar las tareas.
    this.tareasService.getTareasPorTitulo(filtro)
      .pipe(

        // Este tap lo hago solo para mostrar los datos que pasan por aquí
        tap(console.log)
      )
      
      .subscribe( response => {
        
        // Si la respuesta es OK, la lista de tareas se asigna a la respuesta
        if(response.ok) {
          
          this.tareas = response.datos;    

        } else {

          // Muestra el mensaje de error
          this.showAlert(response.mensaje, 'ERROR');
        }

      });
  }

  /**
   * Borrar tarea recibe el evento. El evento de la tabla de tareas emite el ID en la tabla
   * 
   * @param indice 
   */
  borrarTarea(indice: number) {

    // Obtiene la tarea a eliminar
    const tarea = this.tareas[indice];

    // Si el usuario me confirma que quiere eliminar la tarea, la elimina
    this.solicitarConfirmacion(`¿Está seguro de que quiere eliminar la tarea: ${tarea.titulo}?`, 'Atención',
      () => {

        // Elimina la tarea
        this.tareasService.borrarTarea(tarea).subscribe((response) => {

          // Si la respuesta es OK, la lista de tareas se asigna a la respuesta
          if(response.ok) {
        
            // Elimina la tarea del array
            this.tareas.splice(indice, 1);

          } else {

            // Muestra el mensaje de error
            this.showAlert(response.mensaje, 'ERROR');
          }
        });      
      }
    );
  }


  async showAlert(mensaje: string, titulo: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async solicitarConfirmacion(mensaje: string, titulo: string, onOk: any) {
 
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            onOk();
          },
        },
      ],
    });

    await alert.present();
  }

}
