<?php
// Este script recibe la entrada como un objeto JSON y 
// retorna este objeto con el resultado.

    // Pasa la entrada a json
    $json = file_get_contents('php://input');

    // Aquí tenemos un array con los parámetros de entrada
    $objeto = json_decode($json, TRUE);

    // Obtiene los valores que vienen en el array asociativo
    $filtro = $objeto["filtro"];

    // Obtiene la lógica de negocio de Tareas
    $lnUsuarios = LnUsuarios::singletonUsuarios();

    // Obtiene la lista de tareas
    $usuarios = $lnUsuarios->getListadoUsuariosFiltradasPorNombreCompleto($filtro);

    // Prepara la respuesta en caso de éxito
    $respuesta['ok'] = "1";
    $respuesta['mensaje'] = "";
    $respuesta['datos'] = $usuarios;
    
?>