<?php
// Crea una etiqueta y retorna los datos de la misma

    // Pasa la entrada a json
    $json = file_get_contents('php://input');

    // Aquí tenemos un array con los parámetros de entrada
    $objeto = json_decode($json, TRUE);

    // Obtiene los valores que vienen en el array asociativo
    
    $titulo = $objeto["titulo"];
    $idInformador = $objeto["id_informador"];
    $idAsignado = $objeto["id_asignado"];
    $tipo = $objeto["id_tipo_videojuego"];
    $estado = $objeto["id_estado"];
    $descripcion = $objeto["descripcion"];
    $fechaAlta = $objeto["fecha_alta"];
    $fechaVencimiento = $objeto["fecha_vencimiento"];
    $horaVencimiento = $objeto["hora_vencimiento"];

    $videojuego = new Videojuego(
        -1,
        $titulo,
        $idInformador,
        $idAsignado,
        $tipo,
        $estado,
        $descripcion,
        $fechaAlta,
        $fechaVencimiento,
        $horaVencimiento
    );

    // Obtiene la lógica de negocio
    $lnVideojuegos = LnVideojuegos::singletonVideojuegos();

    // Inserta la tarea
    $videojuego = $lnVideojuegos->addVideojuego($videojuego);

    // Prepara la respuesta en caso de éxito
    $respuesta['ok'] = "1";
    $respuesta['mensaje'] = "";
    $respuesta['datos'] = [
        "id" => $videojuego->getIdVideojuego(),
        "titulo" => $videojuego->getTitulo(),
        "informador" => $videojuego->getIdInformador(),
        "asignado" => $videojuego->getIdAsignado(),
        "tipo" => $videojuego->getTipo(),
        "estado" => $videojuego->getEstado(),
        "descripcion" => $videojuego->getDescripcion(),
        "fechaalta" => $videojuego->getFechaAlta(),
        "fechavencimiento" => $videojuego->getFechaVencimiento(),
        "horavencimiento" => $videojuego->getHoraVencimiento()
    ];
?>
