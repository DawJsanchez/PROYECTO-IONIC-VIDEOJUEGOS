import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {switchMap, tap} from 'rxjs';

import {UsuariosService} from 'src/app/services/usuarios.service';
import {ValidacionService} from 'src/app/validators/shared/validacion.service';
import {ValidacionUsuariosService} from "../../validators/usuarios/validacion-usuarios.service";


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  // Defino el formulario
  // En esta definición incluyo
  // - Nombres de los campos. Deben coincidir con los del objeto
  // - Opciones de los campos
  // - Validaciones locales
  // - Validaciones asíncronas
  formulario: FormGroup = this.fb.group({
    id_usuario: [-1],

    usuario: ['',Validators.required],

    password: ['', [Validators.required]],

    nombre_completo: ['', [Validators.required]],
    rol: ['', [Validators.required]],

  }, /*{
    // 008 EstA VALIDACION NO TIENE SENTIDO AQUI
    validators: [this.validacionService.camposNoIguales('id_informador', 'id_asignado')]
  }*/ );

  // Indica si el usuario se está actualizando
  actualizando: boolean = false;

  //-------------------------------------------------------------------------------------
  // Inicialización
  //-------------------------------------------------------------------------------------

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private validacionService: ValidacionService,
    private validacionTituloService: ValidacionUsuariosService,
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
      this.cargarUsuario();
      this.actualizando = true;

      // Se carga la validación asíncrona en caso de edición
      this.formulario.get('usuario')?.clearAsyncValidators();
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
    if (this.formulario.invalid) {

      // Marco los campos como tocados. De ese modo se mostrarán todos los errores
      // registrados en los campos
      this.formulario.markAllAsTouched();

      // Muestro mensaje de error
      this.showAlert('Por favor, revise los datos');

      // Finaliza
      return;
    }

    // Si id_USUARIO es > 0 significa que ya existía. Es actualización
    if (this.formulario.get('id_usuario')?.value > 0) {

      // Actualiza
      this.actualizarUsuario();

    } else {

      // Crea
      this.crearUsuario();
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

        // Solo quiero el primero en estos momentos. Si hubiera más podría tenerlos en un atributo
        // y mostrarlos con un ngFor
        break;
      }
    }

    return mensajeError;
  }

  //-------------------------------------------------------------------------------------
  // Funciones de persistencia. Permiten guardar y recuperar tareas
  //-------------------------------------------------------------------------------------

  /**
   * Cuando estamos editando, este método carga el usuario que esta en el formulario
   */
  cargarUsuario() {

    // Si estamos en modo edición, obtiene los parámeros
    this.activatedRoute.params

      // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)por la tarea
      .pipe(
        switchMap(({id}) => this.usuariosService.getUsuarioPorId(id)),

        // Este pipe muestra lo que viene
        tap(console.log)
      )
      // Finalmente, este subscribe recibe el resultado, que será el objeto
      .subscribe(respuesta => {

        if (respuesta.ok) {

          // Cargo los datos en el formulario.
          this.formulario.reset(respuesta.datos);

        } else {
          this.router.navigate(['/usuarios/listado']);
        }
      });
  }

  /**
   * Actualiza un usuario a partir de los datos en el form
   */
  actualizarUsuario() {
    this.usuariosService.actualizarUsuario(this.formulario.getRawValue())
      .subscribe(respuesta => {
        //MENSAJE DE EXITO
        this.showToast("Usuario guardado", 'bottom');

      });
  }

  /**
   * Crea un usuario a partir de los datos en el form y pasa a modo edición
   */
  crearUsuario() {

    this.usuariosService.agregarUsuario(this.formulario.getRawValue()).subscribe(respuesta => {

      if (respuesta.ok) {

        // Se ha guardado el usuario. Paso a modo edición
        this.router.navigate(['editar-usuario', respuesta.datos.id]);

        // Muestro un toast indicando que se ha guardado el usuario
        this.showToast("Usuario creado", 'bottom');

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
