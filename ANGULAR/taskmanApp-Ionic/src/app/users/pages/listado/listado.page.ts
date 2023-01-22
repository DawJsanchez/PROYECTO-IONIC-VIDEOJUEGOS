import {Component, OnInit} from '@angular/core';
import { tap } from 'rxjs';

import {Usuario, UsuariosService} from "../../services/usuarios.service";
import {DialogService} from "../../../shared/services/dialog.service"

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  usuarios: Usuario[] = [];
  // private usuariosService: UsuariosService;
  // private dialogService: DialogService;


  constructor(
    private dialogService: DialogService,

    // Acceso al backend
    private usuariosService: UsuariosService,
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }
  private cargarUsuarios(filtro: string | undefined = undefined) {

    // Cuando la pantalla se muestra se tienen que mostrar los videojuegos.
    this.usuariosService.getUsuariosPorUsername(filtro)

      .pipe(

        // Este tap lo hago solo para mostrar los datos que pasan por aquí
        tap(console.log)
      )

      .subscribe({

        // Reciebe el siguiente valor
        next: (usuarios: Usuario[]) =>  {

          // Carga los datos
          this.usuarios = usuarios;

          // Muestra el videojuego en el log
          console.log('Cargados usuarios: '+usuarios.length);
        },

        // El observer ha recibido una notificación completa
        complete: () => {
        },

        // El observer ha recibido un error
        error: (error: any) => {

          // Muestra un mensaje de error
          this.dialogService.mostrarMensaje('No ha sido posible cargar los usuarios: '+ error, 'ERROR');

          // Muestra el error por consola
          console.log(error);
        }
      });
  }
}
