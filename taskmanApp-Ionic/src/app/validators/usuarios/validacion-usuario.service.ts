import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ValidacionService } from '../shared/validacion.service';
import {UsuariosService} from "../../services/usuarios.service";

@Injectable({
  providedIn: 'root'
})
export class ValidacionUsuarioService implements AsyncValidator {

  // Ruta base para todas las llamadas al servicio
  private taskmanBaseUrl = environment.taskmanBaseUrl;
  private debug = environment.debug;

  constructor(

    private validacionService   : ValidacionService,
    private usuariosService       : UsuariosService

  ) {

    validacionService.registrarMensajeError("usuarioDuplicado", "Ya existe un usuario con ese nombre de usuario");

  }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    // Obtengo el usuario(username) como argumento
    const usuario = control.value;

    // Tendré que usar un pipe que evalue y me retorne el objeto que necesito para generar validation errors
    // Utilizo el operador map para cambiar el objeto que recibo por el objeto con el error
    return this.usuariosService.getSelectUsuariosPorNombre(usuario)
      .pipe(

        // Esta pausa me permite comprobar como cambia el estado del formulario de INVALID a PENDING a VALID
        //delay(5000),

        map( respuesta => {

          if(respuesta.ok == 1 && respuesta.datos[0]?.texto == usuario) {
            return { usuarioDuplicado: true }
          } else {
            return null;
          }
        })
      );
  }

}
