import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecuentialNumberGeneratorService {

  private secuencia : number = 1;

  constructor() { }

  /**
   * Calcula el siguiente número de secuencia y lo retorna
   * 
   * @returns 
   */
  getSiguienteNumero() : number {
    return this.secuencia++;
  }

}
