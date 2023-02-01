import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
  .subscribe(resultado => {
    if(resultado) {
      this.router.navigate([ '/dashboard' ]);
    } else {
      this.errorInicioSesion = true;
    }
  });

}

}
