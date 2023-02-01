import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Usuarios} from "../../users/interfaces/usuarios.interface";

export interface Videojuego {
  id?:                    number;
  titulo:                 string;
  usuarioInformador:      Usuarios;
  usuarioAsignado:        Usuarios;
  //tipoVideojuego:         TipoVideojuego;
  //estadoTipoVideojuego:   EstadoTipoVideojuego;
  etiquetas:              string;
  fechaAlta:              Date;
  fechaVencimiento:       Date;
  horaVencimiento:        Date;
  createdAt?:             Date;
  updatedAt?:             Date;
}

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {

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
   *  Dado el filtro, retorna los videojuegos que coinciden con el criterio
   */
  getVideojuegosPorTitulo(filtro: string = '%'): Observable<Videojuego []> {

    // Inicializa el objeto con la petición
    const argumentos = {
      filtro: (filtro == '%')?filtro:filtro+'%'
    };

    // Obtiene solo los datos
    return this.httpClient.post<Videojuego []>(this.generarUrl("videojuegos/por-titulo"), argumentos);
  }

  getVideojuegoPorId(idVideojuego: number): Observable<Videojuego> {

    return this.httpClient.get<Videojuego>(this.generarUrl(`videojuegos/${idVideojuego}`));
  }

  /**
   * Pasada un usuario, actualiza el usuario.
   */
  actualizarVideojuego(videojuego: Videojuego): Observable<Videojuego> {

    return this.httpClient.put<Videojuego>(this.generarUrl(`videojuegos`), videojuego);
  }

  /**
   * Agrega un nuevo usuario
   */
  agregarVideojuego(videojuego: Videojuego): Observable<Videojuego> {
    console.log("vide", videojuego);
    return this.httpClient.post<Videojuego>(this.generarUrl("videojuegos"), videojuego);
  }


  /**
   * OBTIENE UN RESUMEN DE VIDEOJUEGOS POR ESTADO PARA REALIZAR EL GRÁFICO
   */
  getResumenVideojuegosPorEstado() {

    //OBTIENE LOS DATOS EN LA URL DADA
    return this.httpClient.get<any [][]>(this.generarUrl(`videojuegos/resumen-videojuegos`));
  }

  /**
   * Borra un videojuego, pasada el videojuego
   */
  borrarVideojuego(videojuego : Videojuego): Observable<any> {

    // Llama a eliminar el usuario
    return this.httpClient.delete<Videojuego>(this.generarUrl(`videojuegos/${videojuego.id}`));
  }

}
