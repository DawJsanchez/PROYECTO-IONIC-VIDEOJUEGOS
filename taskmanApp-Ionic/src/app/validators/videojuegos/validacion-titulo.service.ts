import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ValidacionService } from '../shared/validacion.service';
import {VideojuegosService} from "../../services/videojuegos.service";

@Injectable({
  providedIn: 'root'
})
export class ValidacionTituloService implements AsyncValidator {

  // Ruta base para todas las llamadas al servicio
  private taskmanBaseUrl = environment.taskmanBaseUrl;
  private debug = environment.debug;

  constructor(

    private validacionService   : ValidacionService,
    private videojuegosService       : VideojuegosService

  ) {

    validacionService.registrarMensajeError("tituloDuplicado", "Ya existe una tarea con ese título");

  }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    // Obtengo el titulo como argumento
    const titulo = control.value;

    // Tendré que usar un pipe que evalue y me retorne el objeto que necesito para generar validation errors
    // Utilizo el operador map para cambiar el objeto que recibo por el objeto con el error
    return this.videojuegosService.getVideojuegosPorTitulo(titulo)
      .pipe(

        // Esta pausa me permite comprobar como cambia el estado del formulario de INVALID a PENDING a VALID
        //delay(5000),

        map( respuesta => {

          if(respuesta.ok == 1 && respuesta.datos[0]?.titulo == titulo) {
            return { tituloDuplicado: true }
          } else {
            return null;
          }
        })
      );
  }

}
