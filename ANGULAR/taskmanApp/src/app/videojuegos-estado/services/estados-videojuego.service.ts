import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoTipoVideojuego } from '../interfaces/task-type-state.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadosVideojuegoService {

  // Ruta base para todas las llamadas al servicio
  private taskmanBaseUrl = environment.taskmanBaseUrlSpring;
  private debug = environment.debug;


  constructor(
    private httpClient: HttpClient
  ) {}

   // Genera la url dado el nombre del script 
  private generarUrl(endPoint: string) : string {
    return `${this.taskmanBaseUrl}/${endPoint}`;
  }
  
  /**
   *  Pasado el id del tipo de videojuego retorna los estados posibles.
   */ 
   getSelectEstadosVideojuegoPorTipoVideojuego(id_tipo_videojuego: number): Observable<EstadoTipoVideojuego []> {
    
    // Inicializa el objeto con la petición
    const argumentos = {
      filtro: id_tipo_videojuego 
    };

    // Obtiene solo los datos
    return this.httpClient.post<EstadoTipoVideojuego []>(this.generarUrl("estados-tipo-videojuegos/por-tipo-videojuego"), argumentos);
  }

  /**
   *  Retorna los tipos que existen dentro de videojuegos
   */ 
   getEstadosVideojuegos(): Observable<EstadoTipoVideojuego []> {
    
    // Obtiene solo los datos
    return this.httpClient.get<EstadoTipoVideojuego []>(this.generarUrl("estados-tipo-videojuegos"));
  }
}
