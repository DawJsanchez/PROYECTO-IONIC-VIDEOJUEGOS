<?php
class LnEstadosTipoVideojuego {
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonLnEstadosTipoVideojuego(){
			if(!isset(self::$instancia)){
				$miclase= __CLASS__;
				self::$instancia = new $miclase;
			}
			return self::$instancia;
		}

		public function getSelectEstadosTipoVideojuego($filtro){

			// Carga el singleton 
			$estadostipovideojuego = EstadosTipoVideojuego::singletonEstadosTipoVideojuego();

			// Carga la tabla 
			$r = $estadostipovideojuego->getSelectEstadosTipoVideojuego($filtro);

			// Retorna la tabla de tareas 
			return $r;
		}
	}
?>