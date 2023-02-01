import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import {Usuario} from "../../users/services/usuarios.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // Contendrá el usuario que ha iniciado sesión
  private _usuario : Usuario | undefined;

  // Ruta base para todas las llamadas al servicio
  private taskmanBaseUrl = environment.taskmanBaseUrlSpring;
  private debug = environment.debug;

  constructor(

    private httpClient: HttpClient
  ) {}

  iniciarSesion(login: string, pass: string): Observable<Usuario>   {

    // Argumentos de inicio de sesión
    const argumentos = {
      'username': login,
      'password': pass
    }

    // Obtiene solo los datos
    return this.httpClient.post<Usuario>(this.generarUrl("auth/login"), argumentos)
      .pipe(

        tap(usuario => {

          // Guarda localmente
          this._usuario = usuario;

          // Guardo los datos de inicio de sesión. si se recarga la página
          // no tengo que iniciar de nuevo
          // Esto sería un fallo de seguridad. Sería necesario utilizar
          // algún identificador de sesión sin datos confidenciales
          localStorage.setItem('login', login);
          localStorage.setItem('pass', pass);
        })
      );

  }

  private generarUrl(endPoint: string) : string {
    return `${this.taskmanBaseUrl}/${endPoint}`;
  }

  isSesionIniciada(): Observable<boolean> { // | boolean {

    // Si tengo el usuario inicializado es que tengo sesión
    // retorno un true
    if(this._usuario) {
      return of(true);
    }

    const argumentos = {
      username: localStorage.getItem('login'),
      password: localStorage.getItem('pass'),
    }

    if(!argumentos.username) {
      // Aquí ya se que no se ha iniciado sesión
      return of(false);
    }

    return this.httpClient.post<Usuario>(this.generarUrl("auth/login"), argumentos)
      .pipe(

        map(usuario => {
          if(usuario) {
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
