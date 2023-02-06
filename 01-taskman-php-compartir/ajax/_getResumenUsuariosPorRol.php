<?php
// Permite descargar los posibles estado de tarea dado el ID del tipo
// de tarea a ejecutar

    // Pasa la entrada a json
    $json = file_get_contents('php://input');

    // Aquí tenemos un array con los parámetros de entrada
    $objeto = json_decode($json, TRUE);

    // Obtiene la lógica de negocio
    $lnUsuarios = LnUsuarios::singletonUsuarios();

    // Obtiene la lista
    $usuarios = $lnUsuarios->getResumenUsuariosPorRol();

    // Prepara la respuesta en caso de éxito
    $respuesta['ok'] = "1";
    $respuesta['mensaje'] = "";
    $respuesta['datos'] = $usuarios;
?>