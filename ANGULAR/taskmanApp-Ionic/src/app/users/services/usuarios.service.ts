import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

export interface Usuario {
  id?:             number;
  username:        string;
  nombreCompleto?: string;
  rol:             string;
  createdAt?:      Date;
  updatedAt?:      Date;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // Ruta base para todas las llamadas al servicio

  private taskmanBaseUrl = environment.taskmanBaseUrlSpring;
  private debug = environment.debug;

  constructor(


    private httpClient: HttpClient
  ) {

  }

  // Genera la url dado el nombre del script
  private generarUrl(endPoint: string) : string {
    return `${this.taskmanBaseUrl}/${endPoint}`;
  }

  /**
   *  Dado el filtro, retorna las tareas que coinciden con el criterio
   */
  getSelectUsuariosPorNombre(filtro: string = '%'): Observable<Usuario []> {

    // Inicializa el objeto con la petición
    const argumentos = {
      filtro: (filtro == '%')?filtro:filtro+'%'
    };

    // Obtiene solo los datos
    return this.httpClient.post<Usuario []>(this.generarUrl("usuarios/por-username"), argumentos);
  }

  getUsuarioPorId(idUsuario: number): Observable<Usuario> {

    return this.httpClient.get<Usuario>(this.generarUrl(`usuarios/${idUsuario}`));
  }

  /**
   * Pasada un usuario, actualiza el usuario.
   */
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {

    return this.httpClient.put<Usuario>(this.generarUrl(`usuarios`), usuario);
  }

  /**
   * Agrega un nuevo usuario
   */
  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    console.log("user", usuario);
    return this.httpClient.post<Usuario>(this.generarUrl("usuarios"), usuario);
  }

  /**
   *  Dado el filtro, retorna los usuarios que coinciden con el criterio
   */
  getUsuariosPorUsername(filtro: string = '%'): Observable<Usuario []> {

    // Añade el comodín al final
    if(!filtro.endsWith('%'))
      filtro += '%';

    // Define los argumentos
    const argumentos = {
      filtro: filtro
    }

    // Obtiene solo los datos
    return this.httpClient.post<Usuario []>(this.generarUrl(`usuarios/por-username`), argumentos);
  }

  /**
   * Borra un usuario, pasada el usuario
   */
  borrarUsuario(usuario : Usuario): Observable<Usuario> {

    // Llama a eliminar el usuario
    return this.httpClient.delete<Usuario>(this.generarUrl(`usuarios/${usuario.id}`));
  }

  /**
   * Obtiene el resumen de videojuegos por estado para poder hacer un gráfico
   *
   * TODO. Ver como implementar este.
   */
  getResumenUsuariosPorRol() {
    return this.httpClient.get<any [][]>(this.generarUrl(`usuarios/resumen-usuarios`));
  }

}
