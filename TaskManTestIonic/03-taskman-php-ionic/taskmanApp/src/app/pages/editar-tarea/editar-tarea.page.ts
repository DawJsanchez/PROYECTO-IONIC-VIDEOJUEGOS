import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { switchMap, tap } from 'rxjs';
import { EntradaSelect } from 'src/app/interfaces/select.interface';
import { EstadosTareasService } from 'src/app/services/estados-tareas.service';
import { TareasService } from 'src/app/services/tareas.service';
import { TiposTareaService } from 'src/app/services/tipos-tarea.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ValidacionService } from 'src/app/validators/shared/validacion.service';
import { ValidacionTareasService } from 'src/app/validators/tasks/validacion-tareas.service';
import { ValidacionTituloService } from 'src/app/validators/tasks/validacion-titulo.service';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.page.html',
  styleUrls: ['./editar-tarea.page.scss'],
})
export class EditarTareaPage implements OnInit {

  // Defino el formulario
  // En esta definición incluyo
  // - Nombres de los campos. Deben coincidir con los del objeto
  // - Opciones de los campos
  // - Validaciones locales
  // - Validaciones asíncronas
  formulario: FormGroup = this.fb.group({
    id_tarea          : [-1],

    titulo            : [ '', 
                          [ Validators.required, this.validacionService.validarEmpiezaMayuscula ],
                          [ this.validacionTituloService ]
                        ],

    id_informador     : ['', [ Validators.required] ],
    id_asignado       : ['', [ Validators.required] ],

    id_tipo_tarea     : ['', [ Validators.required] ],

    id_estado         : [ {
                            value: -1, 
                            disabled: true
                          }, 
                          [ Validators.required] 
                        ],

    fecha_alta        : [''],
    fecha_vencimiento : [''],
    hora_vencimiento  : [''],

    descripcion       : ['', [ Validators.required] ],

  }, {  
    // 008 Este segundo argumento que puedo enviar al formgroup permite por ejemplo ejecutar
    // validadores sincronos y asíncronos. Son validaciones al formgroup
    validators: [ this.validacionService.camposNoIguales('id_informador', 'id_asignado') ]
  });

  // Defino campos sueltos auxiliares que voy a utilizar
  // En este caso utilizo este para el datalist aunque en este caso
  // lo podría meter dentro del formulario ya que no va a afectar al funcionamiento.
  nombreInformador    : FormControl = this.fb.control('', Validators.required);

  // Estos arrays contendrán los elementos que voy a cargar en los selects
  selectInformador    : EntradaSelect[] = [];
  selectAsignado      : EntradaSelect[] = [];
  selectTiposTarea    : EntradaSelect[] = [];
  selectEstadosTarea  : EntradaSelect[] = [];

  // Indica si la tarea se está actualizando
  actualizando: boolean = false;

  //-------------------------------------------------------------------------------------
  // Inicialización
  //-------------------------------------------------------------------------------------

  constructor(

    private activatedRoute    : ActivatedRoute,
    private fb                : FormBuilder,
    private router            : Router,
    
    private estadosService    : EstadosTareasService,
    private tareasService     : TareasService,
    private tiposTareaService : TiposTareaService,
    private usuariosService   : UsuariosService,

    private validacionService       : ValidacionService,
    private validacionTareasService : ValidacionTareasService,
    private validacionTituloService : ValidacionTituloService,

    private alertController: AlertController,
    private toastController: ToastController    

  ) { }

  /**
   * Inicialización de la página
   */
  ngOnInit(): void {

    // Si no estamos en modo edición, sale de aquí
    if(this.router.url.includes('editar')) {    
      this.cargarTarea();
      this.actualizando = true;

      // Se carga la validación asíncrona en caso de edición
      this.formulario.get('titulo')?.clearAsyncValidators();
    }

    // Carga el contenido de los selects desde la base de datos
    this.cargarSelectUsuarioInformador();
    this.cargarSelectUsuarioAsignado();
    this.cargarSelectTiposTarea();

    // Cuando se selecciona un tipo de tarea, se debe cargar el combo de 
    // estados para que contenga los estados para ese tipo de tarea
    this.formulario.get('id_tipo_tarea')?.valueChanges.subscribe(id_tipo_tarea => {      
      this.cargarSelectEstados(id_tipo_tarea);
    });  
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
      this.showAlert('Por favor, revise los datos');

      // Finaliza
      return;
    }

    // Si id_tarea es > 0 significa que la tarea ya existía. Es actualización
    if(this.formulario.get('id_tarea')?.value > 0) {

      // Actualiza la tarea
      this.actualizarTarea();

    } else {

      // Crea la tarea
      this.crearTarea();
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
  // Funciones Select Informaador
  //-----------------------------------------------------
  cargarSelectUsuarioInformador() {
    this.usuariosService.getSelectUsuariosPorNombre('%').subscribe(respuesta => {
      this.selectInformador = respuesta.datos;
    });
  }

  //-----------------------------------------------------
  // Funciones Select Asignado
  //-----------------------------------------------------
  cargarSelectUsuarioAsignado() {
    this.usuariosService.getSelectUsuariosPorNombre('%').subscribe(respuesta => {
      this.selectAsignado = respuesta.datos;
    });
  }

  //-----------------------------------------------------
  // Funciones Select Tipos Tarea
  //-----------------------------------------------------
  cargarSelectTiposTarea() {
    this.tiposTareaService.getSelectTiposTarea('%').subscribe(respuesta => {
      this.selectTiposTarea = respuesta.datos;
    });
  }

  //-----------------------------------------------------
  // Funciones Select Estado
  //-----------------------------------------------------
  cargarSelectEstados(id_tipo_tarea: number) {
    this.estadosService.getSelectEstadosTareaPorTipoTarea(id_tipo_tarea).subscribe(respuesta => {
      this.selectEstadosTarea = respuesta.datos;
      this.formulario.get('id_estado')?.enable();
    });
  }

  //-------------------------------------------------------------------------------------
  // Funciones de persistencia. Permiten guardar y recuperar tareas
  //-------------------------------------------------------------------------------------

  /**
   * Cuando estamos editando, este método carga la tarea que estamos editando en el formulario
   */
  cargarTarea() {
      
    // Si estamos en modo edición, obtiene los parámeros
    // y carga los datos
    this.activatedRoute.params
      
      // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
      // por la tarea
      .pipe(

          switchMap( ({id}) => this.tareasService.getTareaPorId(id) ),
          
          // Este pipe muestra lo que viene
          tap(console.log)
      )
      // Finalmente, este subscribe recibe el resultado, que será el objeto
      .subscribe(respuesta => {
        
        if(respuesta.ok) {

          // Cargo los datos en el formulario.
          this.formulario.reset(respuesta.datos);

          this.nombreInformador.setValue(respuesta.datos.informador);
          //this.formulario.patchValue(respuesta.datos);

        } else {
          this.router.navigate([ '/tareas/listado' ]);
        }
      });
  }

  /**
   * Actualiza una tarea a partir de los datos en el form
   */
  actualizarTarea() {
    this.tareasService.actualizarTarea(this.formulario.getRawValue())
      .subscribe(respuesta => {

        this.showToast("Tarea guardada", 'bottom');

      });
  }

  /**
   * Crea una tarea a partir de los datos en el form y pasa a modo edición
   */
  crearTarea() {
    
    this.tareasService.agregarTarea(this.formulario.getRawValue()).subscribe((respuesta) => {
            
      if(respuesta.ok) {
        
        // Se ha guardado la tarea. Paso a modo edición
        this.router.navigate(['editar-tarea', respuesta.datos.id_tarea ]);

        // Muestro un toast indicando que se ha guardado la tarea
        this.showToast("Tarea creada", 'bottom');        
      
      } else {

        this.showAlert(respuesta.mensaje, 'ERROR');
      }
    });          
  }


  //-------------------------------------------------------------------------------------
  // Muestra dialogos
  //-------------------------------------------------------------------------------------

  async showAlert(mensaje: string, titulo: string = "Atención") {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async showToast(mensaje:string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: position
    });

    await toast.present();
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
