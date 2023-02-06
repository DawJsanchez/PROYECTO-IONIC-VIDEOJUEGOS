<?php
class LnSesion {
		
    private static $instancia;
    private $db;

    function __construct() {
        $this->db = Conexion::singleton_conexion();
    }

    public static function singletonLnSesion(){
        if(!isset(self::$instancia)){
            $miclase= __CLASS__;
            self::$instancia = new $miclase;
        }
        return self::$instancia;
    }

    // Retorna true si la sesión se ha iniciado
    public function isIniciada() {
        return isset($_SESSION[SESION_AUTENTICADO]) && 
               $_SESSION[SESION_AUTENTICADO];
    }

    // Inicia la sesión y retorna el objeto del usuario
    public function iniciar($usuario, $password) {
        $u = null;

        // Obtiene el objeto de persistencia
        $usuarios = Usuarios::singletonUsuarios();

        // Obtiene el ID del usuario
        $id_usuario = $usuarios->getIdUsuarioValido($usuario, $password);

        // Si el usuario es > 0 autentico
        if($id_usuario > 0) {
            $u = $usuarios->getUsuario($id_usuario);
            
            // Configura la sesión
            $_SESSION[SESION_AUTENTICADO] = true;
            $_SESSION[SESION_ADMIN]       = $u->isAdmin();
        } 
        
        // Convierte el ID en true
        return $u;
    }

    // Cierra la sesión
    public function cerrar() {
        unset($_SESSION[SESION_AUTENTICADO]);
        unset($_SESSION[SESION_ADMIN]);
    }
}
?>