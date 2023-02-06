<?php
    // Retorna la tarea identificada con el ID

    // Pasa la entrada a json
    $json = file_get_contents('php://input');

    // Aquí tenemos un array con los parámetros de entrada
    $objeto = json_decode($json, TRUE);

    // Obtiene los valores que vienen en el array asociativo
    $id = $objeto["id"];

    // Obtiene la lógica de negocio de Tareas
    $lnUsuarios = LnUsuarios::singletonUsuarios();

    // Obtiene la lista de tareas
    $usuario = $lnUsuarios->getUsuarioPorId($id);

    // Prepara la respuesta en caso de éxito
    $respuesta['ok'] = "1";
    $respuesta['mensaje'] = "";
    $respuesta['datos'] = $usuario;
    
?>