<?php
class LnEtiquetas {
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonLnEtiquetas(){
			if(!isset(self::$instancia)){
				$miclase= __CLASS__;
				self::$instancia = new $miclase;
			}
			return self::$instancia;
		}

		public function addEtiquetaPorNombre($nombre) {

			// Carga el singleton 
			$etiquetas = Etiquetas::singletonEtiquetas();

			$etiqueta = $etiquetas->getEtiquetaPorNombre($nombre);
			if($etiqueta == null) {

				// Crea un objeto de tipo etiqueta
				$etiqueta = new Etiqueta(-1, $nombre);

				// Inserta la etiqueta en la base de datos
				// Ahora el objeto etiqueta contiene el ID
				$etiquetas->addEtiqueta($etiqueta);
			}

			// Retorna la tabla de etiquetas
			return $etiqueta;			
		}


		public function getSelectEtiquetasPorNombre($filtro){

			// Carga el singleton 
			$etiquetas = Etiquetas::singletonEtiquetas();

			// Carga la tabla 
			$r = $etiquetas->getSelectEtiquetasPorNombre($filtro);

			// Retorna la tabla de etiquetas
			return $r;
		}
	}
?>