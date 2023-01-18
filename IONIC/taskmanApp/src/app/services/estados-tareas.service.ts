import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskmanSelectResponse } from '../interfaces/select.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadosTareasService {

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
  *  Pasado el id del tipo de tarea retorna los estados posibles.
  */ 
  getSelectEstadosTareaPorTipoTarea(id_tipo_tarea: number): Observable<TaskmanSelectResponse> {
   
   // Inicializa el objeto con la petición
   const argumentos = {
     filtro: id_tipo_tarea 
   };

   // Obtiene solo los datos
   return this.httpClient.post<TaskmanSelectResponse>(this.generarUrl("_getSelectEstadosTareaPorTipo"), argumentos);
 }


}
