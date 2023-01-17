import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskmanListaTareasResponse, Tarea, TaskmanTareaResponse, TaskmanConsultaTareas } from '../interfaces/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

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
   *  Dado el filtro, retorna las tareas que coinciden con el criterio
   */ 
  getTareasPorTitulo(filtro: string = '%'): Observable<TaskmanListaTareasResponse> {
    
    // Inicializa el objeto con la petición
    const argumentos = {
      filtro: (filtro == '%')?filtro:filtro+'%'
    };

    // Obtiene solo los datos
    return this.httpClient.post<TaskmanListaTareasResponse>(this.generarUrl("_getTareasPorTitulo"), argumentos);
  }

  /**
   * Borra una tarea pasada la tarea
   */
  borrarTarea(tarea : Tarea): Observable<TaskmanTareaResponse> {
    
    // Inicializa el objeto con los argumentos de la petición
    const argumentos = {
      id: tarea.id_tarea
    };

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanTareaResponse>(this.generarUrl("_deleteTarea"), argumentos);
  }


  /**
   * Dado el ID de una tarea, retorna la tarea asociada
   */   
  getTareaPorId(idTarea: number): Observable<TaskmanTareaResponse> {

    // Inicializa el objeto con los argumentos de la petición
    const argumentos = {
      id: idTarea
    };

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanTareaResponse>(this.generarUrl("_getTarea"), argumentos);    
  }


  /**
   * Agrega una nueva tarea
   */
  agregarTarea(tarea: Tarea): Observable<TaskmanTareaResponse> {

    // El argumento es la tarea en formato JSON
    // La tarea no debe contener el ID. Si lo contiene se ignora
    const argumentos = JSON.stringify(tarea);

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanTareaResponse>(this.generarUrl("_addTareaAngular"), argumentos);    
  }


  /**
   * Pasada una tarea, actualiza la tarea. 
   */   
  actualizarTarea(tarea: Tarea): Observable<TaskmanTareaResponse> {

    // El argumento es la tarea en formato JSON
    const argumentos = JSON.stringify(tarea);

    // Llama a eliminar la tarea
    return this.httpClient.post<TaskmanTareaResponse>(this.generarUrl("_setTareaAngular"), argumentos);    
  }

  /**
   * Obtiene el resumen de tareas por estado para poder hacer un gráfico
   */
  getResumenTareasPorEstado() {
    return this.httpClient.get<TaskmanConsultaTareas>(this.generarUrl("_getResumenTareasPorEstado"));        
  }

}
