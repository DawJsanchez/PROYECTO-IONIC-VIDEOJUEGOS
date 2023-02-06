<?php
    require_once 'inc/init.php';
    $lnSesion = LnSesion::singletonLnSesion();

    // Si se indica que se debe cerrar la sesión, la cierra y reenvía al login
    // normal
    if(isset($_REQUEST['cerrar'])) {

        // Cierra la sesión
        $lnSesion->cerrar();

        // Hace una redirección al login
        header('Location: login.php');

        exit;
    } 

    // Si se ha iniciado sesión previamente, redirige al índice
    if($lnSesion->isIniciada()) {

        // Hace una redirección al índice
        header('Location: index.php');
        
        // Finaliza el script
        exit;
    }


    // Si estoy aquí, es que no hay sesión iniciada
    if (isset($_POST['submit'])) {

        // Toma la contraseña que viene del formulario
        $usuario = $_POST['usuario'];
        $contraseña = $_POST['password'];
        
        // Si se puede iniciar sesión, reenvía al usuario a la página 
        // principal
        if($lnSesion->iniciar($usuario,$contraseña)) {

            // Hace una redirección al índice
            header('Location: index.php');
            
            exit;

        } else {
            
            // Prepara un mensaje de error
            $mensajeError = "Usuario o contraseña incorrectos";            
        }
    }

?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="dawjasevillag">
        <meta name="description" content="Login">
        
        <link rel="shortcut icon" href="logo.ico">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
        
        <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/json2html/2.2.2/json2html.min.js" integrity="sha512-LYBxdtbgyLlB9aFozpSH9IpPpP+7t+tRoBG7VhLJ2APxcstLkyMI78qCaLwoIEQwKzbdS0VdK9o3ps4q6NT1cQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>

        
        <title>Login</title>
    </head>
    <body>
        <div class="container mt-5">
            <div class="d-flex justify-content-center h-100">
                <div>
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container mb-2">
                            <img src="img/logo.png" alt="Logo">
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <form method="post">
                            <div class="input-group mb-2">
                                <span class="input-group-text rounded-0 bg-grey"><i class="bi bi-person"></i></span>
                                <input type="usuario" name="usuario" class="form-control input-lg rounded-0" placeholder="Usuario">
                            </div>

                            <div class="input-group mb-2">
                                <span class="input-group-text rounded-0 bg-grey"><i class="bi bi-key"></i></span>
                                <input type="password" name="password" class="form-control input-lg rounded-0" placeholder="Contraseña">
                            </div>
            
                            <?php
                                if(isset($mensajeError)) {
                                    echo '<div class="text-danger">'.$mensajeError.'</div>';
                                }
                            ?>

                            <div class="d-flex justify-content-center mt-3">            
                            <button type="submit" name="submit" class="btn bg-primary text-white">Entrar</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>