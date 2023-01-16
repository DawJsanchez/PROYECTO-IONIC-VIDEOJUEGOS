import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { DialogService } from 'src/app/shared-v/services/dialog.service';
import { ValidacionService } from 'src/app/shared-v/validators/validacion.service';
import { TipoVideojuego } from '../../interfaces/videojuego-tipo.interface';
import { TiposVideojuegoService } from '../../services/tipos-videojuego.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  // Defino el formulario
  // En esta definición incluyo
  // - Nombres de los campos. Deben coincidir con los del objeto
  // - Opciones de los campos
  // - Validaciones locales
  // - Validaciones asíncronas
  formulario: FormGroup = this.fb.group({
    id                : [-1],

    nombre            : [ '', 
                          [ Validators.required ]
                        ],
  });

  
  // Indica si el videojuego se está actualizando
  actualizando: boolean = false;

  //-------------------------------------------------------------------------------------
  // Inicialización
  //-------------------------------------------------------------------------------------

  constructor(

    private activatedRoute    : ActivatedRoute,
    private fb                : FormBuilder,
    private router            : Router,
    private dialogService     : DialogService,
    private tiposVideojuegoService   : TiposVideojuegoService,
    private validacionService       : ValidacionService,
 

  ) { }

  /**
   * Inicialización de la página {VALIDACIÓN ASINCRONA}
   */
  ngOnInit(): void {

    // Si no estamos en modo edición, sale de aquí
    if(this.router.url.includes('editar')) {    
      this.cargarTiposVideojuego();
      this.actualizando = false;
    }
  }


  //-------------------------------------------------------------------------------------
  // Funciones generales del formulario
  //-------------------------------------------------------------------------------------

  /**
   * Guarda los cambios y vuelve a la pantalla anterior. 
   */
  guardar() {

    console.log("formulario",this.formulario.getRawValue());

    // Si el formulario no es válido, muestra un mensaje de error y termina
    if(this.formulario.invalid) {
      
      // Marco los campos como tocados. De ese modo se mostrarán todos los errores
      // registrados en los campos
      this.formulario.markAllAsTouched();

      // Muestro mensaje de error
      this.dialogService.mostrarMensaje('Por favor, revise los datos');

      // Finaliza
      return;
    }

    // Si id_usuario es > 0 significa que la tarea ya existía. Es actualización
    if(this.formulario.get('id')?.value > 0) {

      // Actualiza el usuario
      this.actualizarTiposVideojuego();

    } else {

      // Crea el usuario
      this.crearTiposVideojuego();
    }
  } 

  esCampoNoValido(campo: string) {
    return this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;    
  }

  mensajeErrorCampo(campo: string) {

    const errors = this.formulario.get(campo)?.errors;
    let mensajeError = '';
    
    if(errors) {
      for(let e in errors) {

        // Obtiene el mensaje
        const mensaje = this.validacionService.getMensajeError(e);
        mensajeError = mensajeError + mensaje;        

        // Solo quiero el primero en estos momentos. Si hubiera más podría tenerlos en un atributo
        // y mostrarlos con un ngFor
        break;
      }
    }

    return mensajeError;
  }

  //-------------------------------------------------------------------------------------
  // Funciones de persistencia. Permiten guardar y recuperar videojuegos
  //-------------------------------------------------------------------------------------

  /**
   * Cuando estamos editando, este método carga el tiposVideojuego que estamos editando en el formulario
   */
  cargarTiposVideojuego() {
      
    // Si estamos en modo edición, obtiene los parámeros
    // y carga los datos
    this.activatedRoute.params
      
      // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
      // por el usuario
      .pipe(

          switchMap( ({id}) => this.tiposVideojuegoService.getTiposVideojuegoPorId(id) ),
          
          // Este pipe muestra lo que viene
          tap(console.log)
      )
      // Finalmente, este subscribe recibe el resultado, que será el objeto
      .subscribe({

          // Reciebe el siguiente valor
          next: (tipoVideojuego: TipoVideojuego) =>  {

            // Cargo los datos en el formulario.
            this.formulario.reset(tipoVideojuego);

          },

          // El observer ha recibido una notificación completa
          complete: () => {     
          },

          // El observer ha recibido un error
          error: (error: any) => {

            // Se vuelve al listado
            this.router.navigate([ '/tipos-videojuego/listado' ]);

            // Muestra un mensaje de error
            this.dialogService.mostrarToast('No ha sido posible cargar el tipo: '+ error);
    
            // Muestra el error por consola
            console.log(error);
          }        
      });        
  }

  /**
   * Actualiza un tipo videojuego a partir de los datos en el form
   */
  actualizarTiposVideojuego() {
    this.tiposVideojuegoService.actualizarTiposVideojuego(this.formulario.getRawValue())
      .subscribe(

        {      
          // Recibe el siguiente valor
          next: (tipoVideojuego: TipoVideojuego) =>  {              
          },

          // El observer ha recibido una notificación completa
          complete: () => {     
            this.dialogService.mostrarToast("Tipo Videojuego guardado");
            this.router.navigate(['/tipos-videojuego/listado'])
          },

          // El observer ha recibido un error
          error: (error: any) => {
            this.dialogService.mostrarMensaje('No ha sido posible crear el tipo videojuego: '+error, 'ERROR');
            console.log(error);
          }
        }
      );
  }

  /**
   * Crea un tipo videojuego a partir de los datos en el form y pasa a modo edición
   */
  crearTiposVideojuego() {
    
    this.tiposVideojuegoService.agregarTiposVideojuego(this.formulario.getRawValue()).subscribe(           
      {      
        // Reci  be el siguiente valor
        next: (tipoVideojuego: TipoVideojuego) =>  {

          // Se ha guardado el videojuego. Paso a modo edición
          this.router.navigate(['/tipos-videojuego/editar', tipoVideojuego.id ]);

          // Muestro un toast indicando que se ha guardado el tipo
          this.dialogService.mostrarToast("Tipo creado");

        },

        // El observer ha recibido una notificación completa
        complete: () => {     
          this.router.navigate(['/tipos-videojuego/listado'])
        },

        // El observer ha recibido un error
        error: (error: any) => {
          
          this.dialogService.mostrarMensaje('No ha sido posible crear el tipo: '+error, 'ERROR');
          console.log(error);
        }
      }
    );              
  }

}
