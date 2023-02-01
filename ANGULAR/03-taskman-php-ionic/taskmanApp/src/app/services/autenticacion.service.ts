import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskmanLoginResponse, Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

 // Contendrá el usuario que ha iniciado sesión
 private _usuario : Usuario | undefined;

 // Ruta base para todas las llamadas al servicio
 private taskmanBaseUrl = environment.taskmanBaseUrl;
 private debug = environment.debug;

  // Observable utilizado para ser notificado en los cambios de sesión
  // iniciada o no.
  private __sesionIniciadaSubject : Subject<boolean> = new Subject();

 constructor(
   private httpClient: HttpClient
 ) {}

 // Genera la url dado el nombre del script 
 private generarUrl(script: string) : string {
   return `${this.taskmanBaseUrl}/ajax.php?s=${script}${this.debug?"&__debug":""}`;
 }


 iniciarSesion(login: string, pass: string): Observable<boolean>   {
   
   // Argumentos de inicio de sesión
   const argumentos = {
     usuario: login,
     pass: pass
   }    

   // Obtiene solo los datos
   return this.httpClient.post<TaskmanLoginResponse>(this.generarUrl("_autenticarUsuario"), argumentos)
     .pipe(

         map(respuesta => {

           if(respuesta.ok == 1) {
             
             // Guarda localmente
             this._usuario = respuesta.datos;

             // Guardo los datos de inicio de sesión. si se recarga la página
             // no tengo que iniciar de nuevo
             // Esto sería un fallo de seguridad. Sería necesario utilizar
             // algún identificador de sesión sin datos confidenciales
             localStorage.setItem('login', login);
             localStorage.setItem('pass', pass);

             // Envía a todos los suscriptores
//             this.__sesionIniciadaSubject.next(true);

             return true;
           } else {

            // Envía a todos los suscriptores
//            this.__sesionIniciadaSubject.next(false);

             return false;
           }

         })

     );

 }

 
 isSesionIniciada(): Observable<boolean> { // | boolean {
   
   // Si tengo el usuario inicializado es que tengo sesión
   // retorno un true
   if(this._usuario) {
     return of(true);
   } 

   const argumentos = {
     usuario: localStorage.getItem('login'),
     pass: localStorage.getItem('pass'),
   }

   if(!argumentos.usuario) {
     // Aquí ya se que no se ha iniciado sesión
     return of(false);
   }

   return this.httpClient.post<TaskmanLoginResponse>(this.generarUrl("_autenticarUsuario"), argumentos)
     .pipe(

         map(respuesta => {

           if(respuesta.ok == 1) {
             
             // Guarda localmente
             this._usuario = respuesta.datos;  

//             this.__sesionIniciadaSubject.next(true);

             return true;

           } else {

//             this.__sesionIniciadaSubject.next(false);            
             return false;
           }

         })

     );
 }


 /**
  * Cierra la sesión del usuario
  */
 cerrarSesion(): void {
   this._usuario = undefined;
   localStorage.removeItem('login');
   localStorage.removeItem('pass');

//   this.__sesionIniciadaSubject.next(false);
 }

 /**
  * Permite recibir notificaciones cuando se inicia o cierra sesión
  * 
  * @param listener 
  */
 escucharInicioSesion(listener: any) : void {
  this.__sesionIniciadaSubject.subscribe(si => {
    // Pasa al listener lo que ha pasado
    listener(si);
  });
 }

}
