<?php
// Crea una etiqueta y retorna los datos de la misma

    // Pasa la entrada a json
    $json = file_get_contents('php://input');

    // Aquí tenemos un array con los parámetros de entrada
    $objeto = json_decode($json, TRUE);

    // Obtiene los valores que vienen en el array asociativo
    
    $usuario = $objeto["usuario"];
    $password = $objeto["password"];
    $nombreCompleto = $objeto["nombre_completo"];
    $rol = $objeto["rol"];

    $usuario = new Usuario(
        -1,
        $usuario,
        $password,
        $nombreCompleto,
        $rol
    );

    // Obtiene la lógica de negocio
    $lnUsuarios = LnUsuarios::singletonUsuarios();

    // Inserta la tarea
    $usuario = $lnUsuarios->addUsuario($usuario);

    // Prepara la respuesta en caso de éxito
    $respuesta['ok'] = "1";
    $respuesta['mensaje'] = "";
    $respuesta['datos'] = [
        "id" => $usuario->getIdusuario(),
        "usuario" => $usuario->getUsuario(),
        "password" => $usuario->getPassword(),
        "nombrecompleto" => $usuario->getNombreCompleto(),
        "rol" => $usuario->getRol()
    ];
?>
