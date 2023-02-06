<script type="module" src="iu/listado/videojuegos.mjs"></script>

<!-- 
    Este formulario se utiliza para filtrar registros que vienen de la base de datos
    Permite por ejemplo buscar una tarea cuyo título contenga algo.
  -->
<form id="formTabla" name="formTabla" class="container mb-2">
    <div class="row">
            <!-- Tipo. Combo AJAX -->
            <div class="col-md-5 mb-1">
                <input id="filtro" name="filtro" type="text" class="form-control">                
            </div>            

            <!-- Botón que voy a emplear para mostrar la ventana para añadir una tarea -->
            <!--   
                Añadiendo estos atributos se abre el dialogo automáticamente pero esto no me interesa

                data-bs-toggle="modal" data-bs-target="#edicionTarea" 
              -->
            <button id="botonAlta" name="botonAlta" value="Guarda" type="button" class="btn btn-primary col-md-2 text-white">
                <i class="bi bi-plus-lg text-white"></i>Videojuego
            </button>                            
        </div>
</form>

<!-- Aquí está la tabla donde se van a insetar los resultados -->
<table class="table table-bordered table-striped text-center table-light table-hover align-items-center">

    <!-- Encabezado de la tabla -->
    <thead class="table text-white bg-primary">
        <tr>
            <th scope="col">id</th>
            <th scope="col">Título</th>
            <th scope="col">Tipo</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Vencimiento</th>
            <th scope="col">Hora Vencimiento</th>
            <th scope="col"></th> <!-- Mostrar detalles / Editar -->
            <th scope="col"></th> <!-- Eliminar tarea -->
        </tr>
    </thead>
    
    <!-- 
        Cuerpo de la tabla. Aquí es donde se van a insertar los registros 
        devueltos por la consulta SQL
     -->
    <tbody id='cuerpoTabla'>
    </tbody>
</table>


<!--  
    Cuadro de diálogo donde va a aparecer la modificación de tareas
    
    Es de tipo "Vertically centered scrollable modal"
 -->
 <div class="modal fade" id="edicionVideojuego" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar videojuego</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <?php include 'iu/frm/frmvideojuego.php' ?>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button id="botonGuardar" type="button" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>

