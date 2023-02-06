import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {switchMap, tap} from 'rxjs';
import {EntradaSelect} from 'src/app/interfaces/select.interface';

import {UsuariosService} from 'src/app/services/usuarios.service';
import {ValidacionService} from 'src/app/validators/shared/validacion.service';
import {VideojuegosService} from "../../services/videojuegos.service";
import {EstadosVideojuegosService} from "../../services/estados-videojuego.service";
import {TiposVideojuegoService} from "../../services/tipos-videojuego.service";
import {ValidacionVideojuegosService} from "../../validators/videojuegos/validacion-videojuegos.service";


@Component({
  selector: 'app-editar-videojuego',
  templateUrl: './editar-videojuego.page.html',
  styleUrls: ['./editar-videojuego.page.scss'],
})
export class EditarVideojuegoPage implements OnInit {

  // Defino el formulario
  // En esta definición incluyo
  // - Nombres de los campos. Deben coincidir con los del objeto
  // - Opciones de los campos
  // - Validaciones locales
  // - Validaciones asíncronas
  formulario: FormGroup = this.fb.group({
    id_videojuego: [-1],

    titulo: ['',[Validators.required, Validators.minLength(5)],
    ],
    //   [Validators.required, this.validacionService.validarEmpiezaMayuscula],
    //   [this.validacionTituloService]
    // ],

    id_informador: ['', [Validators.required]],
    id_asignado: ['', [Validators.required]],

    id_tipo_videojuego: ['', [Validators.required]],

    id_estado: [{
      value: -1,
    },
      [Validators.required]
    ],

    fecha_alta: [''],
    fecha_vencimiento: [''],
    hora_vencimiento: [''],

    descripcion: ['', [Validators.required]],

  }, {
    // 008 Este segundo argumento que puedo enviar al formgroup permite por ejemplo ejecutar
    // validadores sincronos y asíncronos. Son validaciones al formgroup
    validators: [this.validacionService.camposNoIguales('id_informador', 'id_asignado'),
      this.validacionService.fechasCorrectas('fecha_alta', 'fecha_vencimiento')]
  });

  // Defino campos sueltos auxiliares que voy a utilizar
  // En este caso utilizo este para el datalist aunque en este caso
  // lo podría meter dentro del formulario ya que no va a afectar al funcionamiento.
  nombreInformador: FormControl = this.fb.control('', Validators.required);

  // Estos arrays contendrán los elementos que voy a cargar en los selects
  selectInformador: EntradaSelect[] = [];
  selectAsignado: EntradaSelect[] = [];
  selectTiposVideojuego: EntradaSelect[] = [];
  selectEstadosVideojuego: EntradaSelect[] = [];

  // Indica si la tarea se está actualizando
  actualizando: boolean = false;

  //-------------------------------------------------------------------------------------
  // Inicialización
  //-------------------------------------------------------------------------------------

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private estadosService: EstadosVideojuegosService,
    private videojuegosService: VideojuegosService,
    private tiposVideojuegoService: TiposVideojuegoService,
    private usuariosService: UsuariosService,
    private validacionService: ValidacionService,
    private validacionVideojuegosService: ValidacionVideojuegosService,
    private validacionTituloService: ValidacionVideojuegosService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
  }

  /**
   * Inicialización de la página
   */
  ngOnInit(): void {

    // Si no estamos en modo edición, sale de aquí
    if (this.router.url.includes('editar')) {
      this.cargarVideojuego();
      this.actualizando = true;

      // Se carga la validación asíncrona en caso de edición
      this.formulario.get('titulo')?.clearAsyncValidators();
    }

    // Carga el contenido de los selects desde la base de datos
    this.cargarSelectUsuarioInformador();
    this.cargarSelectUsuarioAsignado();
    this.cargarSelectTiposVideojuego();

    // Cuando se selecciona un tipo de videojuego, se debe cargar el combo de tipos/estados
    this.formulario.get('id_tipo_videojuego')?.valueChanges.subscribe(id_tipo_videojuego => {
      this.cargarSelectEstados(id_tipo_videojuego);
    });
  }

  //-------------------------------------------------------------------------------------
  // Funciones generales del formulario
  //-------------------------------------------------------------------------------------

  //Guarda los cambios
  guardar() {

    // Si el formulario no es válido, muestra un mensaje de error y termina
    if (this.formulario.invalid) {

      // Marco los campos como tocados. De ese modo se mostrarán todos los errores

      this.formulario.markAllAsTouched();

      // Muestro mensaje de error
      this.showAlert('Por favor, revise los datos');

      // Finaliza
      return;
    }

    // Si id_videojuego es > 0 significa que la tarea ya existía. Es actualización
    if (this.formulario.get('id_videojuego')?.value > 0) {

      // Actualiza el juego
      this.actualizarVideojuego();

    } else {

      // Crea el juego
      this.crearVideojuego();
    }
  }

  esCampoNoValido(campo: string) {
    return this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;
  }

  mensajeErrorCampo(campo: string) {

    const errors = this.formulario.get(campo)?.errors;
    let mensajeError = '';

    if (errors) {
      for (let e in errors) {

        // Obtiene el mensaje
        const mensaje = this.validacionService.getMensajeError(e);
        mensajeError = mensajeError + mensaje;

        break;
      }
    }

    return mensajeError;
  }

  //-----------------------------------------------------
  // Funciones Select Informador
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
  // Select tipos videojuego
  //-----------------------------------------------------
  cargarSelectTiposVideojuego() {
    this.tiposVideojuegoService.getSelectTiposVideojuego('%').subscribe(respuesta => {
      this.selectTiposVideojuego = respuesta.datos;
    });
  }

  //-----------------------------------------------------
  // Select esclavo estados por tipo de videojuego
  //-----------------------------------------------------
  cargarSelectEstados(id_tipo_videojuego: number) {
    this.estadosService.getSelectEstadosVideojuegoPorTipoVideojuego(id_tipo_videojuego).subscribe(respuesta => {
      this.selectEstadosVideojuego = respuesta.datos;
      this.formulario.get('id_estado')?.enable();
    });
  }

  //-------------------------------------------------------------------------------------
  // Funciones de persistencia. Permiten guardar y recuperar juegos
  //-------------------------------------------------------------------------------------

  //Carga el juego que se muestra en el formulario
  cargarVideojuego() {

    // Si estamos en modo edición, obtiene los parámeros
    this.activatedRoute.params

      // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
      .pipe(
        switchMap(({id}) => this.videojuegosService.getVideojuegoPorId(id)),

        // Este pipe muestra lo que viene
        tap(console.log)
      )
      // Finalmente, este subscribe recibe el resultado, que será el objeto
      .subscribe(respuesta => {

        if (respuesta.ok) {

          // Cargo los datos en el formulario.
          this.formulario.reset(respuesta.datos);

          // this.nombreInformador.setValue(respuesta.datos.informador);
          // this.nombreInformador.setValue(respuesta.datos.informador);
          //this.formulario.patchValue(respuesta.datos);

        } else {
          this.router.navigate(['/listado-videojuegos']);
        }
      });
  }

  /**
   * Actualiza un juego a partir de los datos del formulario
   */
  actualizarVideojuego() {
    this.videojuegosService.actualizarVideojuego(this.formulario.getRawValue())
      .subscribe(respuesta => {
        //MENSAJE DE EXITO
        this.showToast("Videojuego guardado", 'bottom');

      });
  }

  /**
   * Crea un videojuego a partir de los datos en el form y pasa a modo edición
   */
  crearVideojuego() {

    this.videojuegosService.agregarVideojuego(this.formulario.getRawValue()).subscribe(respuesta => {

      if (respuesta.ok) {

        // Se ha guardado el juego. Paso a modo edición
        this.router.navigate(['editar-videojuego', respuesta.datos.id]);

        // Muestro un toast indicando que se ha guardado el juego
        this.showToast("Videojuego creado", 'bottom');

      } else {

        this.showAlert(respuesta.mensaje, 'ERROR');
      }
    });
  }

  //-------------------------------------------------------------------------------------
  // DIALOGOS
  //-------------------------------------------------------------------------------------

  async showAlert(mensaje: string, titulo: string = "Atención") {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async showToast(mensaje: string, position: 'top' | 'middle' | 'bottom') {
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
