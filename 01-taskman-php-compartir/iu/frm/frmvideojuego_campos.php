        <div class="row">
            <!-- Informador. BUSQUEDA -->
            <label for="informadorDatalist" class="form-label">Informador</label>
            <input id="informador" name="informador" validacion="idvalido" campo_validacion="informadorId" class="form-control" list="informadorDatalistOptions" id="informadorDatalist" placeholder="Type to search...">
            <div class="invalid-feedback"></div>                
            <input id="informadorId" name="informadorId" type="hidden" value="-1">
            <datalist id="informadorDatalistOptions">
            </datalist>            
        </div>        

        <div class="row">
            <!-- Asignado. BUSQUEDA en tabla por nombre que muestre opciones -->
            <div class="col-md-5 mb-1">
                <label for="asignado" class="form-label">Asignado</label>                
                <select id="asignado" name="asignado" validacion="idvalido" class="form-select">
                </select>                
                <div class="invalid-feedback"></div>
            </div>
        </div>        

        <div class="row">
            <!-- Tipo. Combo AJAX -->
            <div class="col-md-5 mb-1">
                <label for="tipo" class="form-label">Tipo</label>
                <select id="tipo" name="tipo" validacion="idvalido" class="form-select">
                </select>                
                <div class="invalid-feedback"></div>

            </div>

            <!-- Estado. Combo AJAX. Depende del tipo -->
            <div class="col-md-5">
                <label for="estado" class="form-label">Estado</label>
                <select id="estado" name="estado" validacion="idvalido" class="form-select">
                </select>                
                <div class="invalid-feedback"></div>
            </div>
        </div>        

        <div class="row">
            <!-- Fecha de alta. Por omisión. El día en que se da de alta -->
            <div class="col-md-3 mb-1">
                <label for="fechaalta" class="form-label">Fecha alta</label>
                <input id="fechaalta" name="fechaalta" type="date" class="form-control">
            </div>

            <!-- Fecha vencimiento. La escoge el usuario -->
            <div class="col-md-3">
                <label for="fechavencimiento" class="form-label">Fecha vencimiento</label>
                <input id="fechavencimiento" name="fechavencimiento" type="date" class="form-control">
            </div>

            <!-- Hora vencimiento. La escoge el usuario -->
            <div class="col-md-4">
                <label for="horavencimiento" class="form-label">Hora vencimiento</label>
                <input id="horavencimiento" name="horavencimiento" type="time" class="form-control">
            </div>
        </div>        

        <div class="row">
            <!-- Etiquetas. Las etiquetas se añaden o eliminan -->
            <div class="col-md-3 mb-1">
                <label for="etiquetaDataList" class="form-label">Etiqueta</label>
                <input id="etiquetaDataList" list="etiquetaDatalistOptions" name="etiqueta" class="form-control" placeholder="Escribe etiqueta para añadir">
                <input id="etiquetaId" type="hidden" value="-1">
                <datalist id="etiquetaDatalistOptions">
                </datalist>            

                <!-- En este div se insertarán las etiquetas en esta forma -->
                <div id="contenedorEtiquetas">
            </div>
        </div>        

        <!-- Descripción -->
        <div class="row">
            <div class="col-md-12 mb-1">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea id="descripcion" name="descripcion" class="form-control" rows="2"></textarea>
            </div>
        </div>
