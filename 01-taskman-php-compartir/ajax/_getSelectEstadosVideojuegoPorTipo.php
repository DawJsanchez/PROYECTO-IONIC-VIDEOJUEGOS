<?php
// Permite descargar los posibles estado de tarea dado el ID del tipo
// de tarea a ejecutar

    // Pasa la entrada a json
    $json = file_get_contents('php://input');

    // Aquí tenemos un array con los parámetros de entrada
    $objeto = json_decode($json, TRUE);

    // Obtiene los valores que vienen en el array asociativo
    $filtro = $objeto["filtro"];

    // Obtiene la lógica de negocio
    $lnEstados = LnEstadosTipoVideojuego::singletonLnEstadosTipoVideojuego();

    // Obtiene la lista
    $estados = $lnEstados->getSelectEstadosTipoVideojuego($filtro);

    // Prepara la respuesta en caso de éxito
    $respuesta['ok'] = "1";
    $respuesta['mensaje'] = "";
    $respuesta['datos'] = $estados;
?>