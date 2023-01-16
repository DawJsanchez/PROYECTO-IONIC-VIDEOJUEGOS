import { Injectable } from '@angular/core';

// Este servicio tiene la función de trabajar con los diálogos. 

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private HTML_MODAL_ALERT = `
    <div class="modal fade" id="modalAlert" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Advertencia</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  CUERPO
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
              </div>
          </div>
      </div>
    </div>
  `;

  private HTML_MODAL_CONFIRMAR = `
    <div class="modal fade" id="modalConfirmar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEliminarBackdropLabel">Advertencia</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                CONTENIDO
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button id="botonAceptar" type="button" class="btn btn-danger">Aceptar</button>
            </div>
        </div>
      </div>
    </div>
  `;


  private HTML_TOAST = `
  <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center w-100">
    <div id="__Toast" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
  `

  constructor() { }

  /**
   * Muestra un mensaje
   * 
   * @param mensaje 
   * @param titulo 
   */
  mostrarMensaje(mensaje: string, titulo: string = 'Advertencia') : void {

    // Si no tengo insertado el alert lo inserto en el cuerpo
    if(!$('#modalAlert').length) {

      // Esto añade al body el HTML del alert
      $('body').append( this.HTML_MODAL_ALERT );           
    }    

    _mostrarAlert();

    function _mostrarAlert() {
      $('#modalAlert .modal-title').text(titulo);
      $('#modalAlert .modal-body').text(mensaje);
  
      $('#modalAlert').modal('show');  
    }
  }

  


  solicitarConfirmacion(mensaje: string, titulo: string, accion: any) {
    
    // Si no está insertado, lo inserto
    if(!$('#modalConfirmar').length) {

      // Esto añade al body el html del diálogo
      $('body').append( this.HTML_MODAL_CONFIRMAR );          
    } 
  
    _solicitarConfirmacion();
    
    function _solicitarConfirmacion() {

      $('#modalConfirmar .modal-title').text(titulo);
      $('#modalConfirmar .modal-body').text(mensaje);
  
      $('#modalConfirmar #botonAceptar').on('click', (event: any) => {

        // Detiene la propagación        
        event.stopPropagation();

        // Llama a la función pasada como argumento en acción
        accion();
  
        // Desactiva el gestor de evento. Tendremos que añadirlo la próxima vez
        $('#modalConfirmar #botonAceptar').off('click');
      
        // Oculto el modal
        $('#modalConfirmar').modal('hide');    
      });
  
      $('#modalConfirmar').modal('show');  
    }
  }


  /**
   * Muestra un mensaje en formato Toast
   * 
   * @param mensaje 
   */
   mostrarToast(mensaje: string) : void {

    // Si no tengo insertado el alert lo inserto en el cuerpo
    if(!$('#__Toast').length) {

      // Esto añade al body el HTML del alert
      $('body').append( this.HTML_TOAST );           
    }    

    _mostrarToast();

    function _mostrarToast() {
      $('#__Toast .toast-body').text(mensaje);  
      $('#__Toast').toast('show');  
    }
  }


}

