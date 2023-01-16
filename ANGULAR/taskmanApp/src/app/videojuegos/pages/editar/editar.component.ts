import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Usuario } from 'src/app/auth/interfaces/usuarios.interfaces';
import { ValidacionService } from 'src/app/shared-v/validators/validacion.service';
import { DialogService } from 'src/app/shared-v/services/dialog.service';
import { EstadosVideojuegoService } from 'src/app/videojuegos-estado/services/estados-videojuego.service';
import { UsuariosService } from 'src/app/users/services/usuarios.service';
import { EstadoTipoVideojuego } from 'src/app/videojuegos-estado/interfaces/task-type-state.interface';
import { TipoVideojuego } from 'src/app/videojuegos-tipo/interfaces/videojuego-tipo.interface';
import { TiposVideojuegoService } from 'src/app/videojuegos-tipo/services/tipos-videojuego.service';
import { Videojuego } from '../../interfaces/videojuego.interface';
import { VideojuegosSpringService } from '../../services/videojuegos-spring.service';

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

    titulo            : [ '', 
                          [ Validators.required/*, this.validacionService.validarEmpiezaMayuscula ],
                          [ this.validacionTituloService*/ ]
                        ],
    
    // Ahora el usuario informador es un objeto
    usuarioInformador: this.fb.group({
      id     : ['', [ Validators.required] ],
    }),      

    // Ahora el usuario asignado es un objeto
    usuarioAsignado: this.fb.group({
      id     : ['', [ Validators.required] ],
    }),      

    // Ahora el tipoVideojuego es un objeto
    tipoVideojuego: this.fb.group({
      id     : ['', [ Validators.required] ],
    }),      
    
    // Ahora el estadoTipoVideojuego es un objeto
    estadoTipoVideojuego: this.fb.group({      
      id     : [ 
        { 
          value: -1, 
          disabled: false
        }, 
        [ Validators.required ] 
      ],
    }),
    
    fechaAlta         : [''],
    fechaVencimiento  : [''],
    horaVencimiento   : [''],

    descripcion       : ['', [ Validators.required] ],

  }, {  
    // 008 Este segundo argumento que puedo enviar al formgroup permite por ejemplo ejecutar
    // validadores sincronos y asíncronos. Son validaciones al formgroup
    validators: [ this.validacionService.camposNoIguales('usuarioInformador.id', 'usuarioAsignado.id') ]
  });

  // Defino campos sueltos auxiliares que voy a utilizar
  // En este caso utilizo este para el datalist aunque en este caso
  // lo podría meter dentro del formulario ya que no va a afectar al funcionamiento.
  nombreInformador    : FormControl = this.fb.control('', Validators.required);

  // Estos arrays contendrán los elementos que voy a cargar en los selects
  selectInformador    : Usuario[] = [];
  selectAsignado      : Usuario[] = [];
  selectTiposVideojuego    : TipoVideojuego[] = [];
  selectEstadosVideojuego  : EstadoTipoVideojuego[] = [];

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
    
    private estadosService    : EstadosVideojuegoService,
    private videojuegosService     : VideojuegosSpringService,
    private tiposVideojuegoService : TiposVideojuegoService,
    private usuariosService   : UsuariosService,

    private validacionService       : ValidacionService,
 

  ) { }

  /**
   * Inicialización de la página {VALIDACIÓN ASINCRONA}
   */
  ngOnInit(): void {

    // Si no estamos en modo edición, sale de aquí
    if(this.router.url.includes('editar')) {    
      this.cargarVideojuego();
      this.actualizando = false;

      // Se carga la validación asíncrona en caso de edición
      this.formulario.get('titulo')?.clearAsyncValidators();
    }

    // Carga el contenido de los selects desde la base de datos
    this.cargarSelectUsuarioAsignado();
    this.cargarSelectTiposVideojuego();

    // Cuando se selecciona un tipo de videojuego, se debe cargar el combo de 
    // estados para que contenga los estados para ese tipo de videojuego
    //METODO NUEVO
    if(this.formulario.get('tipoVideojuego.id')?.value != ""){ 
      this.formulario.get('tipoVideojuego.id')?.valueChanges.subscribe(id_tipo_videojuego => {      
        this.cargarSelectEstados(id_tipo_videojuego);
      });
    }else{
      this.cargarSelectAllEstadosNewVideojuego();
    }  
  }


  //-------------------------------------------------------------------------------------
  // Funciones generales del formulario
  //-------------------------------------------------------------------------------------

  /**
   * Guarda los cambios y vuelve a la pantalla anterior. 
   */
  guardar() {

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

    // Si id_videojuego es > 0 significa que la tarea ya existía. Es actualización
    if(this.formulario.get('id')?.value > 0) {

      // Actualiza el videojuego
      this.actualizarVideojuego();

    } else {

      // Crea el videojuego
      this.crearVideojuego();
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

  //-----------------------------------------------------
  // Funciones Select Asignado
  //-----------------------------------------------------
  cargarSelectUsuarioAsignado() {
    this.usuariosService.getSelectUsuariosPorNombre('%').subscribe(usuarios => {
      this.selectAsignado = usuarios;
    });
  }

  //-----------------------------------------------------
  // Funciones Select Tipos Videojuego
  //-----------------------------------------------------
  cargarSelectTiposVideojuego() {
    this.tiposVideojuegoService.getTiposVideojuegos().subscribe(tiposVideojuego => {
      this.selectTiposVideojuego = tiposVideojuego;
    });
  }

  //-----------------------------------------------------
  // Funciones Select Estado
  //-----------------------------------------------------
  cargarSelectEstados(id_tipo_videojuego: number) {
    this.estadosService.getSelectEstadosVideojuegoPorTipoVideojuego(id_tipo_videojuego).subscribe(estadosTipoVideojuego => {
      this.selectEstadosVideojuego = estadosTipoVideojuego;
      this.formulario.get('estadoTipoVideojuego.id')?.enable();
    });
  }

  //-----------------------------------------------------
  // Funciones Select Estados Videojuego
  //-----------------------------------------------------
  cargarSelectAllEstadosNewVideojuego() {
    this.estadosService.getEstadosVideojuegos().subscribe(estadosTiposVideojuego => {
      this.selectEstadosVideojuego = estadosTiposVideojuego;
      console.log("lista",estadosTiposVideojuego);
    });
  }


  //-------------------------------------------------------------------------------------
  // Funciones de persistencia. Permiten guardar y recuperar videojuegos
  //-------------------------------------------------------------------------------------

  /**
   * Cuando estamos editando, este método carga el videojuego que estamos editando en el formulario
   */
  cargarVideojuego() {
      
    // Si estamos en modo edición, obtiene los parámeros
    // y carga los datos
    this.activatedRoute.params
      
      // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
      // por el videojuego
      .pipe(

          switchMap( ({id}) => this.videojuegosService.getVideojuegoPorId(id) ),
          
          // Este pipe muestra lo que viene
          tap(console.log)
      )
      // Finalmente, este subscribe recibe el resultado, que será el objeto
      .subscribe({

          // Reciebe el siguiente valor
          next: (videojuego: Videojuego) =>  {

            // Cargo los datos en el formulario.
            this.formulario.reset(videojuego);

            this.nombreInformador.setValue(videojuego.usuarioInformador.username);
            //this.formulario.patchValue(respuesta.datos);  
          },

          // El observer ha recibido una notificación completa
          complete: () => {     
          },

          // El observer ha recibido un error
          error: (error: any) => {

            // Se vuelve al listado
            this.router.navigate([ '/videojuegos/listado' ]);

            // Muestra un mensaje de error
            this.dialogService.mostrarToast('No ha sido posible cargar el videojuego: '+ error);
    
            // Muestra el error por consola
            console.log(error);
          }        
      });        
  }

  /**
   * Actualiza un videojuego a partir de los datos en el form
   */
  actualizarVideojuego() {
    this.videojuegosService.actualizarVideojuego(this.formulario.getRawValue())
      .subscribe(

        {      
          // Reciebe el siguiente valor
          next: (videojuego: Videojuego) =>  {              
          },

          // El observer ha recibido una notificación completa
          complete: () => {     
            this.dialogService.mostrarToast("Videojuego guardado");
            this.router.navigate(['/videojuegos/listado']);
          },

          // El observer ha recibido un error
          error: (error: any) => {
            this.dialogService.mostrarMensaje('No ha sido posible crear el videojuego: '+error, 'ERROR');
            console.log(error);
          }
        }
      );
  }

  /**
   * Crea un videojuego a partir de los datos en el form y pasa a modo edición
   */
  crearVideojuego() {
    
    this.videojuegosService.agregarVideojuego(this.formulario.getRawValue()).subscribe(           
      {      
        // Reci  be el siguiente valor
        next: (videojuego: Videojuego) =>  {

          console.log("videocreado",videojuego);

          // Se ha guardado el videojuego. Paso a modo edición
          this.router.navigate(['/videojuegos/editar', videojuego.id ]);

          // Muestro un toast indicando que se ha guardado el videojuego
          this.dialogService.mostrarToast("Videojuego creado");

          // Muestra la videojuego en el log
          console.log(videojuego);
        },

        // El observer ha recibido una notificación completa
        complete: () => {     
          this.router.navigate(['/videojuegos/listado']);
        },

        // El observer ha recibido un error
        error: (error: any) => {
          
          this.dialogService.mostrarMensaje('No ha sido posible crear el videojuego: '+error, 'ERROR');
          console.log(error);
        }
      }
    );              
  }

  //-----------------------------------------------------
  // Funciones DataList Informador
  //-----------------------------------------------------
  nombreInformadorInput(e : Event) {

    // Hace que pueda ver el evento como un input event
    const event = e as InputEvent;

    // Toma el nombre escrito del informador del datalist
    const filtro = this.nombreInformador.value;
    if(!event.inputType || event.inputType == 'insertReplacementText') {

      // Copia el identificador
      this.nombreInformadorCopiarId(filtro);

    } else {

      // Hemos escrito. Significa que se ha invalidado el ID. Lo 
      // pongo a un valor invalido.
      this.formulario.get('usuarioInformador.id')?.setValue(-1);      

      // Obtiene el valor
      this.usuariosService.getSelectUsuariosPorNombre(filtro).subscribe(usuarios => {

        // Pone la respuesta en el array
        this.selectInformador = usuarios;
      });
    }    
  }

  nombreInformadorChange(event : Event) {
      console.log(this.nombreInformador.value);

      // Copia el nombre del informador
      this.nombreInformadorCopiarId(this.nombreInformador.value);
  }

  /**
   * Recorre el array del select para buscar el ID y el nombre y los copia
   */
  nombreInformadorCopiarId(texto : string) {
    for(let e of this.selectInformador) {
      if(e.username === texto) {

        this.formulario.get('usuarioInformador.id')?.setValue(e.id);
      }
    }
  }
}
