import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Videojuego } from '../interfaces/videojuego.interface';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosSpringService {

  //Rutas base
  private taskmanBaseUrl = environment.taskmanBaseUrlSpring;
  private debug = environment.debug;

  constructor(
    private httpClient: HttpClient
  ) { }

// Genera URL 
private generarUrl(endPoint: string) : string {
  return `${this.taskmanBaseUrl}/${endPoint}`;
}

/**
 *  filtro busqueda
 */ 
 getVideojuegosPorTitulo(filtro: string = '%'): Observable<Videojuego []> {

  if(!filtro.endsWith('%'))
    filtro += '%';

  const argumentos = {
    filtro: filtro
  }

  // Retorna el resultado
  return this.httpClient.post<Videojuego []>(this.generarUrl(`videojuegos/por-titulo`), argumentos);
}

/**
 * Delete
 * Borra un videojuego
 */
borrarVideojuego(videojuego : Videojuego): Observable<any> {
  
  // Borra el videojuego pasado por la ruta
  return this.httpClient.delete<any>(this.generarUrl(`videojuegos/${videojuego.id}`));
}


/**
 * Show
 * Retorna un videojuego pasada una id
 */   
getVideojuegoPorId(idVideojuego: number): Observable<Videojuego> {

  return this.httpClient.get<Videojuego>(this.generarUrl(`videojuegos/${idVideojuego}`));    
}


/**
 * Add
 * Añade un videojuego
 */
agregarVideojuego(videojuego: Videojuego): Observable<Videojuego> {
  console.log("vide", videojuego);
  
  return this.httpClient.post<Videojuego>(this.generarUrl("videojuegos"), videojuego);    
}


/**
 * Update
 * Actualiza un videojuego
 */   
actualizarVideojuego(videojuego: Videojuego): Observable<Videojuego> {

  return this.httpClient.put<Videojuego>(this.generarUrl(`videojuegos`), videojuego);    
}

/**
 * Resumen para el gráfico
 */
getResumenVideojuegosPorEstado() {

  return this.httpClient.get<any [][]>(this.generarUrl(`videojuegos/resumen-videojuegos`));        
}
}
