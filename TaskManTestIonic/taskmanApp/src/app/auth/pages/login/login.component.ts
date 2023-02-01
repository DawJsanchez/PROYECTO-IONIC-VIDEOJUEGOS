import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuarios.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  // Credenciales en la página
  credenciales = {

    login: '',
    pass: ''

  };

  errorInicioSesion: boolean = false;

  constructor(

    private router: Router,

    private autenticacionService: AutenticacionService

  ) { }

  ngOnInit(): void {
  }

  login() {

    this.autenticacionService.iniciarSesion(this.credenciales.login, this.credenciales.pass)
    .subscribe(
      {      
        // Recibe el siguiente valor
        next: (usuario: Usuario) =>  {
          console.log(usuario);
        },

        // El observer ha recibido una notificación completa
        complete: () => {     
          console.log("complete");
          this.errorInicioSesion = false;
          this.router.navigate([ '/dashboard-v' ]);
        },

        // El observer ha recibido un error
        error: (error) => {
          console.log(error);
          this.errorInicioSesion = true;
        }
      }
    );
  }

}
