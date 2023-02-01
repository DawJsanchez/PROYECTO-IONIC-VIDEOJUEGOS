import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AutenticacionService} from "../../services/autenticacion.service";
import {Usuario} from "../../../users/services/usuarios.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  errorInicioSesion: boolean = false;
  credenciales = {

    login: '',
    pass: ''

  };
  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
              private router: Router,
              private autenticacionService: AutenticacionService
  ) {
    this.formularioLogin = this.fb.group({
      'login': new FormControl("", Validators.required),
      'pass': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  ingresar() {
console.log(this.formularioLogin.value.login);
// console.log(this.credenciales);
    this.autenticacionService.iniciarSesion(this.formularioLogin.value.login, this.formularioLogin.value.pass)
      .subscribe(
        {
          // Recibe el siguiente valor
          next: (usuario: Usuario) => {
            console.log(usuario);
          },

          // El observer ha recibido una notificación completa
          complete: () => {
            console.log("complete");
            this.errorInicioSesion = false;
            this.router.navigate(['/folder/Dashboard-v']);
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
