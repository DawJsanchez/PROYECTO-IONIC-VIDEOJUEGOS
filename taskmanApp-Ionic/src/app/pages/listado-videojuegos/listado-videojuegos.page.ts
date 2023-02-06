import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {tap} from 'rxjs';

import {VideojuegosService} from "../../services/videojuegos.service";
import {Videojuego} from "../../interfaces/videojuego.interface";

@Component({
  selector: 'app-listado-videojuegos',
  templateUrl: './listado-videojuegos.page.html',
  styleUrls: ['./listado-videojuegos.page.scss'],
})
export class ListadoVideojuegosPage implements OnInit {

  // Lista de videojuegos
  videojuegos: Videojuego[] = [];

  constructor(

    // Servicio de diálogos
    private alertController: AlertController,
    // Backend
    private videojuegosService: VideojuegosService
  ) {
  }

  ngOnInit(): void {
    // Carga los juegos
    this.cargarVideojuegos();
  }

  /**
   *  Método a invocar para lanzar la búsqueda
   */
  buscar(termino: string): void {

    // Aquí se hace la búsqueda por el término de búsqueda
    this.cargarVideojuegos(termino);
  }

  /*
   * Método para cargar los juegos pasado un filtro
   */
  private cargarVideojuegos(filtro: string | undefined = undefined) {

    // Cuando la pantalla se muestra se tienen que mostrar los videojuegos.
    this.videojuegosService.getVideojuegosPorTitulo(filtro)

      .pipe(
        // Este tap lo hago solo para mostrar los datos que pasan por aquí
        tap(console.log)
      )

      .subscribe(response => {
        // Si la respuesta es OK, la lista de tareas se asigna a la respuesta
        if(response.ok) {
          this.videojuegos = response.datos;
        } else {
          // Muestra el mensaje de error
          this.showAlert(response.mensaje, 'ERROR');
        }
      });
  }

  //Borrar videojuego por id
  borrarVideojuego(indice: number) {

    // Obtiene el juego a eliminar
    const videojuego = this.videojuegos[indice];

    // Confirmación de borrado
    this.solicitarConfirmacion(`¿Está seguro de que quiere eliminar la videojuego: ${videojuego.titulo}?`, 'Atención',
      () => {

        // Elimina el juego
        this.videojuegosService.borrarVideojuego(videojuego).subscribe((response) => {

          // Si la respuesta es OK, la lista de juegos se asigna a la respuesta
          if(response.ok) {

            // Elimina el juego del array
            this.videojuegos.splice(indice, 1);

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
