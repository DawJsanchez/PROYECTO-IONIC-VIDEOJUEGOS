<?php
class LnUsuarios {
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonUsuarios(){
			if(!isset(self::$instancia)){
				$miclase= __CLASS__;
				self::$instancia = new $miclase;
			}
			return self::$instancia;
		}
        /**
        * En caso de error este método podría lanzar una excepción
        */
        public function addUsuario(Usuario $u){
            // Carga el singleton de juegos
            $usuarios = Usuarios::singletonUsuarios();

            // Añade la tarea
            $usuarios->addUsuario($u);

            return $u;
        }
        /**
         * Actualiza la tarea
         */
        public function setUsuario(Usuario $u){

            // Carga el singleton de juegos
            $usuarios = Usuarios::singletonUsuarios();
            // Inserta el videojuego
            $usuarios->setUsuario($u);

            return $u;
        }

        public function getUsuarioPorId($id){

            $usuarios = Usuarios::singletonUsuarios();
            // Carga la tabla de videojuegos
            $r = $usuarios->getUsuarioPorId($id);
            // Retorna el juego
            return $r;
        }

        public function getListadoUsuariosFiltradasPorNombreCompleto($filtro){

            // Carga el singleton de videojuegos
            $usuarios = Usuarios::singletonUsuarios();
            // Carga la tabla
            $r = $usuarios->getListadoUsuariosFiltradasPorNombreCompleto($filtro);
            // Retorna la tabla de juegos
            return $r;
        }
        public function getUsuariosPorCredenciales($filtro){

            // Carga el singleton de videojuegos
            $usuarios = Usuarios::singletonUsuarios();
            // Carga la tabla
            $r = $usuarios->getUsuariosPorCredenciales($filtro);
            // Retorna la tabla de juegos
            return $r;
        }

		public function getSelectUsuariosPorNombre($filtro){

			// Carga el singleton 
			$usuarios = Usuarios::singletonUsuarios();

			// Carga la tabla 
			$r = $usuarios->getSelectPorNombre($filtro);

			// Retorna la tabla de tareas 
			return $r;
		}

        public function getResumenUsuariosPorRol() {
            // Carga el singleton
            $usuarios = Usuarios::singletonUsuarios();
            // Carga la tabla de juegos x9019123 vez
            $r = $usuarios->getResumenUsuariosPorRol();
            // Retorna el resultado
            return $r;
        }
        public function deleteUsuario($id){

            $usuarios = Usuarios::singletonUsuarios();

            $r = $usuarios->deleteUsuario($id);

            return $r;
        }
	}
?>