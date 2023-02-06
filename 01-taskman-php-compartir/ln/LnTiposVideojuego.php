<?php
class LnTiposVideojuego {
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonLnTiposVideojuego(){
			if(!isset(self::$instancia)){
				$miclase= __CLASS__;
				self::$instancia = new $miclase;
			}
			return self::$instancia;
		}

		public function getSelectTiposVideojuego($filtro){

			// Carga el singleton 
			$tiposvideojuego = TiposVideojuego::singletonTiposVideojuego();

			// Carga la tabla 
			$r = $tiposvideojuego->getSelectTiposVideojuego($filtro);

			// Retorna la tabla de tareas 
			return $r;
		}
	}
?>