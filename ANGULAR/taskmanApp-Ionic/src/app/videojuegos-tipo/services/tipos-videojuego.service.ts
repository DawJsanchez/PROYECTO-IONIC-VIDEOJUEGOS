import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoVideojuego } from '../interfaces/videojuego-tipo.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposVideojuegoService {

    // Ruta base para todas las llamadas al servicio
    private taskmanBaseUrl = environment.taskmanBaseUrlSpring;
    private debug = environment.debug;

  constructor(
    private httpClient: HttpClient
  ) { }

  // Genera la url dado el nombre del script 
  private generarUrl(endPoint: string) : string {
    return `${this.taskmanBaseUrl}/${endPoint}`;
  }

  /**
   *  Retorna los tipos que existen dentro de tipo videojuegos
   */ 
  getTiposVideojuegos(): Observable<TipoVideojuego []> {
    
    // Obtiene solo los datos
    return this.httpClient.get<TipoVideojuego []>(this.generarUrl("tipos-videojuegos"));
  }

  getTiposVideojuegoPorId(idTiposVideojuego: number): Observable<TipoVideojuego> {

    return this.httpClient.get<TipoVideojuego>(this.generarUrl(`tipos-videojuegos/${idTiposVideojuego}`));    
  }

  /**
   * Pasada un tipo videojuegos, actualiza el tipo videojuegos. 
   */   
  actualizarTiposVideojuego(tipoVideojuego: TipoVideojuego): Observable<TipoVideojuego> {

    return this.httpClient.put<TipoVideojuego>(this.generarUrl(`tipos-videojuegos`), tipoVideojuego);    
  }

   /**
   * Agrega un nuevo tipo videojuegos
   */
   agregarTiposVideojuego(tipoVideojuego: TipoVideojuego): Observable<TipoVideojuego> {

    return this.httpClient.post<TipoVideojuego>(this.generarUrl("tipos-videojuegos"), tipoVideojuego);    
  }

  /**
   *  Dado el filtro, retorna los usuarios que coinciden con el criterio
   */ 
  getTiposVideojuegoPorNombre(filtro: string = '%'): Observable<TipoVideojuego []> {

    // Añade el comodín al final
    if(!filtro.endsWith('%'))
      filtro += '%';

    // Define los argumentos
    const argumentos = {
      filtro: filtro
    }

    // Obtiene solo los datos
    return this.httpClient.post<TipoVideojuego []>(this.generarUrl(`tipos-videojuegos/por-nombre`), argumentos);
  }

  /**
   * Borra un usuario, pasada el usuario
   */
  borrarTiposVideojuego(tipoVideojuego : TipoVideojuego): Observable<TipoVideojuego> {
    
    // Llama a eliminar el usuario
    return this.httpClient.delete<TipoVideojuego>(this.generarUrl(`tipos-videojuegos/${tipoVideojuego.id}`));
  }

  /**
     * Obtiene el resumen de videojuegos por estado para poder hacer un gráfico
     * 
     * TODO. Ver como implementar este.
     */
  getResumenVideojuegosPorTipo() {
    return this.httpClient.get<any [][]>(this.generarUrl(`tipos-videojuegos/resumen-tipos`));        
  }
}
