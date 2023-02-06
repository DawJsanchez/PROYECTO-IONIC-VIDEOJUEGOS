<?php
    require_once 'inc/init.php';
    $lnSesion = LnSesion::singletonLnSesion();

    if(!isset($_REQUEST[SESION_DEBUG]) && !$lnSesion->isIniciada()) {

        // Hace una redirección al índice
        header('Location: login.php');
        
        // Finaliza el script
        exit;
    }
?>
<!doctype html> 
<html lang= "es" > 
<head> 

    <!-- Required meta tags --> 
    <meta charset= "utf-8" > 
    <meta name= "viewport" content= "width=device-width, initial-scale=1" > 
    <meta name="author" content="">

    <!-- Bootstrap CSS en la web--> 
    <link rel="shortcut icon" href="logo.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" integrity="sha384-xeJqLiuOvjUBq3iGOjvSQSIlwrpqjSHXpduPd6rQpuiM3f5/ijby8pCsnbu5S81n" crossorigin="anonymous">
    
    <!-- jQuery first, then Popper.js, then Bootstrap JS --> 
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/json2html/2.2.2/json2html.min.js" integrity="sha512-LYBxdtbgyLlB9aFozpSH9IpPpP+7t+tRoBG7VhLJ2APxcstLkyMI78qCaLwoIEQwKzbdS0VdK9o3ps4q6NT1cQ==" crossorigin="anonymous" referrerpolicy="no-referrer" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous" defer></script>
    <script src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js" defer></script>
    
    <title>Gestor de videojuegos</title>

</head> 

<body> 

    <!--contenedor principal--> 	
    <div class="container"> 

        <!-- Configura la barra y asigna el color --> 	
        <nav class="navbar navbar-expand-md navbar-dark bg-primary mb-4">

            <!-- Enlace al dashboard -->
            <a class="navbar-brand m-1" href="#"><img src="img/logo-pequeño.png" alt="Logo"></a>

            <!-- Menú desplegable -->
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav mr-auto">
 
                    <!-- Cuadro de mandos -->
                    <li class="nav-item active">
                        <a class="nav-link" href="index.php?p=iu/dashboard">Dashboard</a>
                    </li>

                    <!-- Tareas -->
                    <li class="nav-item active">
                        <a class="nav-link" href="index.php?p=iu/listado/videojuegos">Videojuegos</a>
                    </li>

                    <!-- Configuración -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarClientes" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Configuración</a>
                        
                        <ul class="dropdown-menu" aria-labelledby="navbarConfiguracion">
                            <li>
                                <a class="dropdown-item" href="index.php?p=iu/listado/usuarios">Usuarios</a>
                            </li> 
                            <li>
                                <a class="dropdown-item" href="index.php?p=iu/listado/tiposvideojuego">Tipos de videojuego</a>
                            </li> 
                            <li>
                                <a class="dropdown-item" href="index.php?p=iu/listado/estados">Estados</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="index.php?p=iu/listado/etiquetas">Etiquetas</a>
                            </li>
                        </ul>
                    </li>            
                </ul>
            </div>

            <!-- Cerrar sesión -->
            <a class="navbar-brand m-2" href="login.php?cerrar=1"><i class="bi bi-box-arrow-right" style="font-size:30px;"></i></a>
        </nav>

        <!-- Contenido de la página -->
        <div class="container">
            <div class="row">
                    <!--Parte central de la pantalla-->
                    <?php                 
                        if (isset($_GET['p'])){
                            
                            require_once $_GET['p'].'.php';
                        }
                        else{
                            require_once "iu/dashboard.php";
                        }
                    ?>
            </div>
        </div>
       
        <br>
       
        <!-- Pie de la página -->
        <!--
        <footer class="py-3 bg-primary">
            <div class="container">
            <p class="m-0 text-center text-white">Gestor de tareas Curso 20XX/XX</p>
            </div>
        </footer>
        -->
    </div> <!--contenedor principal-->      
</body> 
</html> 