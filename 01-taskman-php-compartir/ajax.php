<?php
    require_once 'inc/init.php';
    ini_set('display_errors', DEBUG);

    $lnSesion = LnSesion::singletonLnSesion();

    // Prepara el objeto para la respuesta AJAX
    $respuesta = array(
        "ok"        => "0",    // 1 si todo ok
        "mensaje"   => "",     // Mensaje de error si lo hay
        "datos"     => ""      // Resultado de la operación   
    );


    if(!isset($_REQUEST[SESION_DEBUG]) && !$lnSesion->isIniciada()) {

        // Muestra un error
        echo "NO SESION";
        
        // Finaliza el script
        exit;
    }

    // Script a invocar.
    if (isset($_GET['s'])){                        
        try {
            require_once 'ajax/'.$_GET['s'].'.php';
        } catch( \Exception $e) {
        
            $respuesta['ok'] = "0";
            $respuesta['mensaje'] = $e->getMessage();
            $respuesta['datos'] = "";
        }
        
        // Prepara la respuesta HTTP
        header('Content-Type:application/json');  
    
        // Convierte la respuesta en JSON
        $respuesta_json = json_encode($respuesta);

        // Devuelve la respuesta
        echo($respuesta_json);    
        
    } else {

        // MOSTRAR UN ERROR
        print("ERROR");
    }
?>