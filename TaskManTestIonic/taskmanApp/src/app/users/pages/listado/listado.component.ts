import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Usuario } from 'src/app/auth/interfaces/usuarios.interfaces';
import { DialogService } from 'src/app/shared-v/services/dialog.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  // Lista de usuarios
  usuarios: Usuario[] = [];

  constructor(
        
    // Servicio para mostrar diálogos
    private dialogService: DialogService,

    // Acceso al backend
    private usuariosService: UsuariosService,
    
  ) {}

  ngOnInit(): void {

    // Carga los usuarios
    this.cargarUsuarios();
  }

  /**
   *  Método a invocar para lanzar la búsqueda 
   */   
  buscar(termino: string): void {
   
    // Aquí se hace la búsqueda por el término de búsqueda
    this.cargarUsuarios(termino);
  }


  /**
   * 
   * @param filtro Método para cargar los usuarios
   * 
   */
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

  /**
   * Borrar videojuego recibe el evento. El evento de la tabla de videojuegos emite el ID en la tabla
   * 
   * @param indice 
   */
  borrarUsuario(indice: number) {

    // Obtiene el usuario a eliminar
    const usuario = this.usuarios[indice];
 
    // Si el usuario me confirma que quiere eliminar el videojuego, la elimina
    this.dialogService.solicitarConfirmacion(`¿Está seguro de que quiere eliminar el usuario: ${usuario.username}?`, 'Atención',
      () => {

        // Elimina el usuario
        this.usuariosService.borrarUsuario(usuario).subscribe({

          // Reciebe el siguiente valor
          next: (respuesta: any) =>  {
   
            // Elimina el usuario del array
            this.usuarios.splice(indice, 1);

            // Muestra el usuario en el log
            console.log('Usuario eliminado : '+usuario.id);
          },
  
          // El observer ha recibido una notificación completa
          complete: () => {     
          },
  
          // El observer ha recibido un error
          error: (error: any) => {
  
            // Muestra un mensaje de error
            this.dialogService.mostrarMensaje('No ha sido posible eliminar el usuario '+ error, 'ERROR');
    
            // Muestra el error por consola
            console.log(error);
          }        
        });
      }
    );
  }
}
