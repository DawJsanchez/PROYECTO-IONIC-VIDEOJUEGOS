<?php
// Retorna los usuarios pasado el nombre a buscar

    // Pasa la entrada a json
    $json = file_get_contents('php://input');

    // Aquí tenemos un array con los parámetros de entrada
    $objeto = json_decode($json, TRUE);

    // Obtiene los valores que vienen en el array asociativo
    $filtro = $objeto["filtro"];

    // Obtiene la lógica de negocio
    $lnTipos = LnTiposVideojuego::singletonLnTiposVideojuego();

    // Obtiene la lista
    $tipos = $lnTipos->getSelectTiposVideojuego($filtro);

    // Prepara la respuesta en caso de éxito
    $respuesta['ok'] = "1";
    $respuesta['mensaje'] = "";
    $respuesta['datos'] = $tipos;        
?>