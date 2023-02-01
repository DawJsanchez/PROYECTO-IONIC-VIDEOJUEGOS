import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Videojuego } from '../interfaces/videojuego.interface';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosSpringService {

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
   *  MEDIANTE UN FILTRO RETORNA LOS VIDEOJUEGOS QUE COINCIDAN POR EL TITULO
   */ 
   getVideojuegosPorTitulo(filtro: string = '%'): Observable<Videojuego []> {

    // AÑADE PORCENTAJE AL FINAL
    if(!filtro.endsWith('%'))
      filtro += '%';

    // DEFINE LOS ARGUNMENTOS
    const argumentos = {
      filtro: filtro
    }

    // OBTIENE LOS DATOS REALIZANDO UNA PETICIÓN AL BACKEND A LA URL INDICADA
    return this.httpClient.post<Videojuego []>(this.generarUrl(`videojuegos/por-titulo`), argumentos);
  }

  /**
   * BORRA UN VIDEOJUEGO MEDIANTE UN VIDEOJUEGO
   */
  borrarVideojuego(videojuego : Videojuego): Observable<any> {
    
    // BORRA EL VIDEOJUEGO EN LA RUTA DADA
    return this.httpClient.delete<any>(this.generarUrl(`videojuegos/${videojuego.id}`));
  }


  /**
   * MEDIANTE EL ID DE UN VIDEOJUEGO, RETORNA EL VIDEOJUEGO CON ESE ID
   */   
  getVideojuegoPorId(idVideojuego: number): Observable<Videojuego> {

    // OBTIENE EL VIDEOJUEGO CON ID INDICADO
    return this.httpClient.get<Videojuego>(this.generarUrl(`videojuegos/${idVideojuego}`));    
  }


  /**
   * AÑADE UN NUEVO VIDEOJEGO
   */
  agregarVideojuego(videojuego: Videojuego): Observable<Videojuego> {
    console.log("vide", videojuego);
    
    //CREA EL VIDEOJUEGO EN LA URL INDICADA
    return this.httpClient.post<Videojuego>(this.generarUrl("videojuegos"), videojuego);    
  }


  /**
   * ACTUALIZAD UN VIDEOJUEGO MEDIANTE UN VIDEOJUEGO
   */   
  actualizarVideojuego(videojuego: Videojuego): Observable<Videojuego> {

    // ACTUALIZA EL VIDEOJUEGO EN LA URL DADA
    return this.httpClient.put<Videojuego>(this.generarUrl(`videojuegos`), videojuego);    
  }

  /**
   * OBTIENE UN RESUMEN DE VIDEOJUEGOS POR ESTADO PARA REALIZAR EL GRÁFICO
   */
  getResumenVideojuegosPorEstado() {

    //OBTIENE LOS DATOS EN LA URL DADA
    return this.httpClient.get<any [][]>(this.generarUrl(`videojuegos/resumen-videojuegos`));        
  }
}
