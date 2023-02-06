import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../interfaces/usuario.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Credenciales en la página
  credenciales = {

    login: 'Admin',
    pass: '1234',
    id:'2'

  };

  errorInicioSesion: boolean = false;
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
  ngOnInit(): void {
  }

  ingresar() {

    this.autenticacionService.iniciarSesion(this.credenciales.login, this.credenciales.pass)
      .subscribe(resultado => {
        if(resultado) {
          this.router.navigate([ '/dashboard' ]);
        } else {
          this.errorInicioSesion = true;
        }
      });
  }

}
