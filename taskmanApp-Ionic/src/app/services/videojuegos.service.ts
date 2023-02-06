import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  TaskmanConsultaVideojuegos,
  TaskmanListaVideojuegosResponse,
  TaskmanVideojuegoResponse,
  Videojuego
} from '../interfaces/videojuego.interface';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {

  //Rutas base
  private taskmanBaseUrl = environment.taskmanBaseUrl;
  private debug = environment.debug;

  constructor(
    private httpClient: HttpClient
  ) { }

// Genera URL
  private generarUrl(script: string) : string {
    return `${this.taskmanBaseUrl}/ajax.php?s=${script}${this.debug?"&__debug":""}`;
  }
/**
 *  filtro busqueda
 */
getVideojuegosPorTitulo(filtro: string = '%'): Observable<TaskmanListaVideojuegosResponse> {

  // Inicializa el objeto con la petición
  const argumentos = {
    filtro: (filtro == '%')?filtro:filtro+'%'
  };

  // Obtiene solo los datos
  return this.httpClient.post<TaskmanListaVideojuegosResponse>(this.generarUrl("_getVideojuegosPorTitulo"), argumentos);
}

/**
 * Delete
 * Borra un videojuego
 */
borrarVideojuego(videojuego : Videojuego): Observable<TaskmanVideojuegoResponse> {

  // Inicializa el objeto con los argumentos de la petición
  const argumentos = {
    id: videojuego.id_videojuego
  };

  // Llama a eliminar la tarea
  return this.httpClient.post<TaskmanVideojuegoResponse>(this.generarUrl("_deleteVideojuego"), argumentos);
}


  /**
   * Show
   * Retorna un videojuego pasada una id
   */
  getVideojuegoPorId(idVideojuego: number): Observable<TaskmanVideojuegoResponse> {

    // Inicializa el objeto con los argumentos de la petición
    const argumentos = {
      id: idVideojuego
    };

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanVideojuegoResponse>(this.generarUrl("_getVideojuego"), argumentos);
  }


/**
 * Add
 * Añade un videojuego
 */
agregarVideojuego(videojuego: Videojuego): Observable<TaskmanVideojuegoResponse> {

  // El argumento es la tarea en formato JSON
  // La tarea no debe contener el ID. Si lo contiene se ignora
  const argumentos = JSON.stringify(videojuego);

  // Llama a eliminar la tarea
  return this.httpClient.post<TaskmanVideojuegoResponse>(this.generarUrl("_addVideojuego"), argumentos);
}


  actualizarVideojuego(videojuego: Videojuego): Observable<TaskmanVideojuegoResponse> {

    // El argumento es la tarea en formato JSON
    const argumentos = JSON.stringify(videojuego);

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanVideojuegoResponse>(this.generarUrl("_setVideojuego"), argumentos);
  }

  /**
   * Obtiene el resumen de tareas por estado para poder hacer un gráfico
   */
  getResumenVideojuegosPorEstado() {
    return this.httpClient.get<TaskmanConsultaVideojuegos>(this.generarUrl("_getResumenVideojuegosPorEstado"));
  }

  /**
   * Obtiene el resumen de tareas por estado para poder hacer un gráfico
   */
  getResumenVideojuegosPorTipo() {
    return this.httpClient.get<TaskmanConsultaVideojuegos>(this.generarUrl("_getResumenVideojuegosPorTipo"));
  }
}
