<?php
class EtiquetasVideojuego{
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonEtiquetasVideojuego(){
			if(!isset(self::$instancia)){
				$miclase= __CLASS__;
				self::$instancia = new $miclase;
			}
			return self::$instancia;
		}

		public function addEtiquetaVideojuego(EtiquetaVideojuego $e){

			$consulta="INSERT INTO etiquetas_videojuego (id_videojuego, id_etiqueta)
						VALUES(?,?)";
			
			$query=$this->db->preparar($consulta);				
				$query->bindParam(1, $e->getIdVideojuego());
				$query->bindParam(1, $e->getIdEtiqueta());

			// Si no se ha podido insertar lanza una excepción
			if(!$query->execute()) {
				throw new Exception("No se ha podido insertar la etiqueta de videojuego");
			}
			
			return $e;
		}
	}
?>