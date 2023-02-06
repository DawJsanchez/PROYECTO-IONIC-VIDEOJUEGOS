<!--
    http://localhost/daw/daw2-dwec-profesorado/taskman/01-taskman-php/index.php?p=iu/frm/frmtarea

    -- Será posible invocarlo también en modo standalone. Al fin y al cabo es solo HTML
       probarlo con un enlace a crear una tarea directamente
    -- Introducir AJAX y validaciones del formulario. Voy a implementar el modelo de bootstrap
    -- Meter en un dialogo modal. Debe permitir además que se muestre en modo consulta o alta
-->

<!-- 
    needs-validation indica que este formulario se va a validar
    novalidate desactiva el feedback por defecto del navegador. Se usará el feedback de bootstrap
-->
<form id="frmvideojuego" class="container needs-validation" name="frmvideojuego" method="POST" action="ajax.php?s=_addVideojuego" novalidate>

    <div class="mx-auto">        

        <!-- Identificador de la tarea -->
        <input id="videojuegoId" name="videojuegoId" type="hidden" value="-1">

        <!-- Título de la incidencia. Es texto -->
        <div class="row">
            <div class="col-md-12 mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input id="titulo" name="titulo" type="text" class="form-control" validacion="novacio">
                <div class="invalid-feedback"></div>                
            </div>
        </div>

        <ul class="nav nav-tabs mb-2" id="tabVideojuego" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="datos-tab" data-bs-toggle="tab" data-bs-target="#datos" type="button" role="tab" aria-controls="datos" aria-selected="true">Datos</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="comentarios-tab" data-bs-toggle="tab" data-bs-target="#comentarios" type="button" role="tab" aria-controls="comentarios" aria-selected="false">Comentarios</button>
            </li>
        </ul>

        <div class="tab-content" id="tabContentVideojuegoEdit">
            <div class="tab-pane fade show active" id="datos" role="tabpanel" aria-labelledby="datos-tab">
                <?php include 'iu/frm/frmvideojuego_campos.php' ?>
            </div>
            <div class="tab-pane fade" id="comentarios" role="tabpanel" aria-labelledby="comentarios-tab">
                <?php include 'iu/frm/frmvideojuego_comentarios.php' ?>
            </div>
        </div>
</form>
	<?php 
		if (isset($_POST['alta']) && $_POST['alta'] == 1) {
			//Esto significa que el usuario ha pulsado el botón submit

			$vCliente=Clientes::singletonClientes();
			$nombre=$_POST['nombre'];
            $apellido1=$_POST['apellido1'];
            $apellido2=$_POST['apellido2'];
            $nif= $_POST['nif'];
            $numCta=$_POST['numCta'];
            $comoNosConocio=$_POST['conocio'];           

			//testear que no se repitan nombres de clientes;
			$id=1;//cualquier valor porque lo genera la bd
			$idCliente=1;//algoritmo que elabore el idCliente
            $idUsuario=1;//algoritmo que elabore el idUsuario
			$activo=1;//constante cada ve que se trate de dar de alta una nueva familia (pr defecto)
			
			$f=new Cliente($id, $idCliente, $idUsuario, $nombre, $apellido1, $apellido2, $nif, $numCta, $comoNosConocio, $activo);

			$insertado=$vCliente->addUnCliente($f);

			if ($insertado) {
				
				echo "Se ha insertado satisfactoriamente";
			}else{
				echo "Ha habido algun error en la insercion del cliente";
			}
		}
	 ?>





