import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor() { }

  // Definición de los errores que se pueden emitir cuando se validan campos independientes
  private mensajesError : any = {
    noEmpiezaMayuscula: "El valor debe comenzar por mayúscula",
    required: "Campo requerido"
  }

  //---------------------------------------------------------------
  // Funciones para obtener el texto de los errores
  //---------------------------------------------------------------
  getMensajeError(error: string): string {
    return this.mensajesError[error];
  } 

  // Permite a otras clases de validación añadir sus mensajes aquí
  registrarMensajeError(clave: string, valor: string) {
    this.mensajesError[clave] = valor;
  }

  //---------------------------------------------------------------
  // Funciones para validar un solo campo
  //---------------------------------------------------------------
  
  validarEmpiezaMayuscula(control: FormControl) : ValidationErrors | null {
      
      // Obtiene el valor en el control
      const inicial :string = control.value?.trim()[0];     
   
      // Si el valor no pasa la validación, tenemos problemas
      if(inicial && inicial != inicial.toUpperCase()) {
        
        // Rengo que devolver un objeto con el error
        return {
          // El atributo indica la validación que no se ha pasado
          // Los campos tendrán estos errores por lo que se puede mostrar un mensaje
          noEmpiezaMayuscula: true
        }  
      }
  
      // Null implica que todo OK. Nada que notificar
      return null;
    }

  
  //---------------------------------------------------------------
  // Validación para campos relacionados
  //---------------------------------------------------------------
  
  // Esta función retorna un validador. El objetivo es validar que dos campos sean diferentes
  camposNoIguales(campo1: string, campo2: string) {
    
    // Retorna una función que trata el formgroup que va a hacer las comprobaciones
    return ( formGroup : AbstractControl): ValidationErrors | null => {

      const valor1 = formGroup.get(campo1)?.value;
      const valor2 = formGroup.get(campo2)?.value;

      if(valor1 == valor2) {

        // Defino el error
        const error = {
          iguales: true
        }

        // Establece el error en el segundo campo que se ha comparado
        // Esto es importante para que se pueda mostrar el error correctamente en la vista
        formGroup.get(campo2)?.setErrors(error);

        // Retorna el error
        return error;

      } else {
        
        // Me aseguro de eliminar el error en caso de que la validacióm se pase 
        // OJO. Se elimina cualquier error que tuviera antes el campo
        formGroup.get(campo2)?.setErrors(null);
      }

      return null;
    }
  }
}
