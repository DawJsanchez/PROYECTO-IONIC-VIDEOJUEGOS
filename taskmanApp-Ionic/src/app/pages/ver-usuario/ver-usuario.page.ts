import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import {UsuariosService} from "../../services/usuarios.service";
import {Usuario} from "../../interfaces/usuario.interface";

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.page.html',
  styleUrls: ['./ver-usuario.page.scss'],
})
export class VerUsuarioPage implements OnInit {


  usuario! : Usuario | undefined;

//-------------------------------------------------------------------------------------
// Inicialización
//-------------------------------------------------------------------------------------

constructor(

  private activatedRoute    : ActivatedRoute,
  private router            : Router,

  private usuariosService     : UsuariosService

) { }

/**
 * Inicialización de la página
 */
ngOnInit(): void {

  // Carga videojuegos
  this.cargarUsuario();
}

//-------------------------------------------------------------------------------------
// Funciones de persistencia. Permiten guardar y recuperar usuarios
//-------------------------------------------------------------------------------------

/**
 * Cuando estamos editando, este método carga al usuario que esta en el formulario
 */
 cargarUsuario() {

  // Si estamos en modo edición, obtiene los parámeros
  this.activatedRoute.params

    // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
    // por el usuario
    .pipe(
        switchMap( ({id}) => this.usuariosService.getUsuarioPorId(id) ),

        // Este pipe muestra lo que viene
        tap(console.log)
    )
    // Finalmente, este subscribe recibe el resultado, que será el objeto
    .subscribe(respuesta => {

      if(respuesta.ok) {

        // Carga los datos
        this.usuario = respuesta.datos;

      } else {
        this.router.navigate([ '/listado-usuarios' ]);
      }
    });
  }
}
