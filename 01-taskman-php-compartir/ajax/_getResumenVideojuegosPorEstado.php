<?php
// Permite descargar los posibles estado de tarea dado el ID del tipo
// de tarea a ejecutar

    // Pasa la entrada a json
    $json = file_get_contents('php://input');

    // Aquí tenemos un array con los parámetros de entrada
    $objeto = json_decode($json, TRUE);

    // Obtiene la lógica de negocio
    $lnVideojuegos = LnVideojuegos::singletonVideojuegos();

    // Obtiene la lista
    $videojuegos = $lnVideojuegos->getResumenVideojuegosPorEstado();

    // Prepara la respuesta en caso de éxito
    $respuesta['ok'] = "1";
    $respuesta['mensaje'] = "";
    $respuesta['datos'] = $videojuegos;
?>