import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.scss'],
})
export class FiltroBusquedaComponent implements OnInit {

  // VARIABLES DE ENTORNO
  // Pausa para rebote
  private userInputDebounceDelay: number = environment.userInputDebounceDelay;

  // 1 Término que se relaciona con ngModel con el formulario
  termino: string = '';
  private ultimoTerminoEnviado: string = '??';

  // 2. Este input es para el placeholder. Permite recibirlo para mostrarlo de forma personalizada  
  // Al ser esto una propiedad, se puede referenciar ahora directamente en el modelo utilizando [] para
  // referenciar a su valor. De este modo, el valor que me han pasado pasa al modelo de forma transparente
  @Input() placeholder: string = '';

  // 3. Para notificar cuando se hace una búsqueda vamos a poner ahora que se haga
  // una notificación. Usaremos el output y un event Emmiter en este caso de tipo cadena
  // ya que lo que vamos a emitir es el término. Se podría utilizar un interfaz para emitir
  // un objeto con varios atributos.
  @Output() onBusquedaEjecutada: EventEmitter<string> = new EventEmitter();

  // 4 Declaramos un Subject que no es otra cosa que un sujeto observable  
  // Aquí lo vamos a utilizar para detectar cuando el usuario lleva más de 
  // X tiempo sin pulsar una tecla.
  debouncer: Subject<string> = new Subject();

  constructor() { }

  // 4 Implemento este método porque lo voy a necesitar para el debouncer
  // se lanza una única vez cuando se crea el compomente para inicializar
  // nuestro componente.
  ngOnInit(): void {

    // Se subscribe al debouncer. Que no es más que un objeto al que puedo suscribirme
    this.debouncer
      // 4. Finalmente, el pipe es algo que puedo usar aquí para transformar la información
      // En este caso, mete una pausa y solo envía información en caso de que pase un lapso de tiempo
      .pipe(
        debounceTime(this.userInputDebounceDelay)   
      )
      .subscribe(valor => {        
        // 3. Cuando llego aquí, el usuario lleva un tiempo sin pulsar ninguna tecla.
        // Lanzo ahora el evento que me va a permitir enviar el término        

        // Muestra el valor que se va a emitir
        this.fireOnBusquedaEjecutada(valor);
      }
    )

  }

  // 5. Ahora implemento el gestor del evento tecla presionada. Este evento lo tengo asignado
  // en el html par aque sea invocado cada vez que se pulsa una tecla
  onKeyPress(event: any) : void {

    // Cuandos e pulsa una tecla envía datos al debouncer. 
    this.debouncer.next( this.termino );    
  }

  // Lanza la búsqueda
  buscar() : void {

    // Esto hace que el enter fuerce la búsqueca
    this.ultimoTerminoEnviado = '??';

    // Lanza la búsqueda
    this.fireOnBusquedaEjecutada(this.termino);
  }

  /**
   * Lanza el evento 
   * 
   * @param termino 
   */
  private fireOnBusquedaEjecutada(termino: string) : void {
 
    // Solo se envía cuando el término ha cambiado
    if(termino == this.ultimoTerminoEnviado)
      return;

    // Guarda el término
    this.ultimoTerminoEnviado = termino;

    // Muestra el término
    console.log(termino);

    // Lanza el evento
    this.onBusquedaEjecutada.emit(this.termino);
  }

}
