<?php
// Crea una etiqueta y retorna los datos de la misma

    // Pasa la entrada a json
    $json = file_get_contents('php://input');

    // Aquí tenemos un array con los parámetros de entrada
    $objeto = json_decode($json, TRUE);

    // Obtiene los valores que vienen en el array asociativo
    $nombre = $objeto["nombre"];

    // Obtiene la lógica de negocio
    $lnEtiquetas = LnEtiquetas::singletonLnEtiquetas();

    // Obtiene la lista de etiquetas
    $etiqueta = $lnEtiquetas->addEtiquetaPorNombre($nombre);

    // Prepara la respuesta en caso de éxito
    $respuesta['ok'] = "1";
    $respuesta['mensaje'] = "";
    $respuesta['datos'] = [ 
        "id_etiqueta" => $etiqueta->getIdEtiqueta(),
        "nombre" => $etiqueta->getNombre()    
    ];
?>

