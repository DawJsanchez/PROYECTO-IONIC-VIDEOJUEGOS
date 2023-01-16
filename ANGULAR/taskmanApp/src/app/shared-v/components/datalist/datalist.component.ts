import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SecuentialNumberGeneratorService } from 'src/app/shared-v/services/secuential-number-generator.service';
import { TiposVideojuegoService } from 'src/app/videojuegos-tipo/services/tipos-videojuego.service';
import { TaskmanSelectResponse } from '../../interfaces/select.interface';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {

  // Prefijo a emplear para los datalist
  private dataListIdPrefix : string = '__dtlst'; 

  // Número de secuencia
  private __secuencia: number = -1;

  // Parámetros de entrada
  @Input() label: string = '';  // Etiqueta a mostrar
  @Input() placeholder: string = ''; // Texto para el placeholder
  @Input() dataSource!: (filtro: string) => Observable<TaskmanSelectResponse>;

  // Mapeo atributos con los campos
  nombreEntidad : string = '';

  // Datos en la lista


  get inputId() : string {
    // Genera el ID del input
    return this.dataListIdPrefix + this.__secuencia + 'I';
  }  

  get datalistId() : string {
    // Genera el ID del input
    return this.dataListIdPrefix + this.__secuencia + 'D';
  }  


//  - label.for
//  - input.list
//  - input.id
//  - datalist.id

  constructor(

    private generator: SecuentialNumberGeneratorService,

    // TODO. A ver como entro esto como argumento
    // 
    private tiposVideojuegoservice: TiposVideojuegoService

  ) { }

  ngOnInit(): void {

    // Obtiene el número de secuencia a asignar a este componente.
    this.__secuencia = this.generator.getSiguienteNumero();

    // Carga los datos 
    this.dataSource('%').subscribe(respuesta => {

      if(respuesta.ok) {
        // Todo ok. Gebería 

      }
    });

  }

  //-----------------------------------------------------
  // Funciones DataList Informador
  //-----------------------------------------------------
  /**
   * Se invoca cada vez que hay entrada del usuario
   */
  onUserInput(event: Event): void {
    // METER EL MISMO ROYO QUE PARA EL FILTRO - BUSQUEDA
    debugger;
    console.log(event);
    console.log(this.nombreEntidad);
  }

  onChange(event: Event): void {
    // SE INVOCA AL SALIR DEL CAMPO SI HAY CAMBIOS
    debugger;
    console.log(event);
    console.log(this.nombreEntidad);
  }

}
