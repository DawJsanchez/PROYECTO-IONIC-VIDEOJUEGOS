import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {tap} from 'rxjs';

import {VideojuegosService} from "../../services/videojuegos.service";
import {Videojuego} from "../../interfaces/videojuego.interface";
import {UsuariosService} from "../../services/usuarios.service";
import {Usuario} from "../../interfaces/usuario.interface";

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
})
export class ListadoUsuariosPage implements OnInit {

  // Lista de usuarios
  usuarios: Usuario[] = [];


  constructor(

    // Servicio para mostrar diálogos
    private alertController: AlertController,
    // Acceso al backend
    private usuariosService: UsuariosService
  ) {
  }

  ngOnInit(): void {

    // Carga de usuarios
    this.cargarUsuarios();
  }

  /**
   *  Buscador
   */
  buscar(termino: string): void {

    // Aquí se hace la búsqueda por el término de búsqueda
    this.cargarUsuarios(termino);
  }


  /*
   * @param filtro Método para cargar los usuarios
   */
  private cargarUsuarios(filtro: string | undefined = undefined) {

    // Cuando la pantalla se muestra se tienen que mostrar las coincidencias.
    this.usuariosService.getUsuariosPorNombreCompleto(filtro)

      .pipe(

        // Este tap lo hago solo para mostrar los datos que pasan por aquí
        tap(console.log)
      )

      .subscribe(response => {

        // Si la respuesta es OK, la lista de usuarios se asigna a la respuesta
        if(response.ok) {

          this.usuarios = response.datos;

        } else {

          // Muestra el mensaje de error
          this.showAlert(response.mensaje, 'ERROR');
        }

      });
  }

  //Borrar usuario por id
  borrarUsuario(indice: number) {

    // Obtiene el usuario a eliminar
    const usuario = this.usuarios[indice];

    // Confirmacion del usuario
    this.solicitarConfirmacion(`¿Está seguro de que quiere eliminar la usuario: ${usuario.nombre_completo}?`, 'Atención',
      () => {

        // Borrar usuario
        this.usuariosService.borrarUsuario(usuario).subscribe((response) => {

          if(response.ok) {
            // Elimina el usuario del array
            this.usuarios.splice(indice, 1);
          } else {
            // Muestra el mensaje de error
            this.showAlert(response.mensaje, 'ERROR');
          }
        });
      }
    );
  }
//------------------------------------------------------
// Alertas
//------------------------------------------------------
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
