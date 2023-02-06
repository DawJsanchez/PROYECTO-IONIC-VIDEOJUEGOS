import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskmanSelectResponse } from '../interfaces/select.interface';
import {TaskmanListaUsuariosResponse, TaskmanUsuarioResponse, TaskmanConsultaUsuarios,Usuario} from "../interfaces/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // Ruta base para todas las llamadas al servicio
  private taskmanBaseUrl = environment.taskmanBaseUrl;
  private debug = environment.debug;

  constructor(
    private httpClient: HttpClient
  ) {}

  // Genera la url dado el nombre del script
  private generarUrl(script: string) : string {
    return `${this.taskmanBaseUrl}/ajax.php?s=${script}${this.debug?"&__debug":""}`;
  }
  /**
   * Show
   * Retorna un videojuego pasada una id
   */
  getUsuarioPorId(idUsuario: number): Observable<TaskmanUsuarioResponse> {

    // Inicializa el objeto con los argumentos de la petición
    const argumentos = {
      id: idUsuario
    };

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanUsuarioResponse>(this.generarUrl("_getUsuario"), argumentos);
  }
  /**
   *  filtro busqueda
   */
  getUsuariosPorNombreCompleto(filtro: string = '%'): Observable<TaskmanListaUsuariosResponse> {

    // Inicializa el objeto con la petición
    const argumentos = {
      filtro: (filtro == '%')?filtro:filtro+'%'
    };

    // Obtiene solo los datos
    return this.httpClient.post<TaskmanListaUsuariosResponse>(this.generarUrl("_getUsuariosPorNombreCompleto"), argumentos);
  }
  /**
   *  Dado el filtro, retorna las tareas que coinciden con el criterio
   */
  getSelectUsuariosPorNombre(filtro: string = '%'): Observable<TaskmanSelectResponse> {

    // Inicializa el objeto con la petición
    const argumentos = {
      filtro: (filtro == '%')?filtro:filtro+'%'
    };

    // Obtiene solo los datos
    return this.httpClient.post<TaskmanSelectResponse>(this.generarUrl("_getSelectUsuariosPorNombre"), argumentos);
  }

  /**
   * Add
   * Añade un usuario
   */
  agregarUsuario(usuario: Usuario): Observable<TaskmanUsuarioResponse> {

    // El argumento es la tarea en formato JSON
    // La tarea no debe contener el ID. Si lo contiene se ignora
    const argumentos = JSON.stringify(usuario);

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanUsuarioResponse>(this.generarUrl("_addUsuario"), argumentos);
  }


  actualizarUsuario(usuario: Usuario): Observable<TaskmanUsuarioResponse> {

    // El argumento es la tarea en formato JSON
    const argumentos = JSON.stringify(usuario);

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanUsuarioResponse>(this.generarUrl("_setUsuario"), argumentos);
  }

  borrarUsuario(usuario : Usuario): Observable<TaskmanUsuarioResponse> {

    // Inicializa el objeto con los argumentos de la petición
    const argumentos = {
      id: usuario.id_usuario
    };

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanUsuarioResponse>(this.generarUrl("_deleteUsuario"), argumentos);
  }

  /**
   * Obtiene el resumen de usuarios filtrados por rol
   */
  getResumenUsuariosPorRol() {
    return this.httpClient.get<TaskmanConsultaUsuarios>(this.generarUrl("_getResumenUsuariosPorRol"));
  }
}
