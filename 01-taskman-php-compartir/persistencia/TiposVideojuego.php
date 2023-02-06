<?php
class TiposVideojuego {
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonTiposVideojuego() {
			if(!isset(self::$instancia)){
				$miclase= __CLASS__;
				self::$instancia = new $miclase;
			}
			return self::$instancia;
		}


		/**
		 * Dado el filtro a aplicar sobre el nombre del tipo, devuelve
		 * los tipos
		 */
		public function getSelectTiposVideojuego($filtro) {
        				
			// Prepara la consulta a la base de datos
			$query=$this->db->preparar($this::SQL_SELECT_TIPOS_VIDEOJUEGO);

			// Asigna los parámetros a la consulta. Reemplaza las ?
			// por los valores pasados como argumento
			$query->bindParam(1,$filtro);
			
			// Lanza la consulta contra la BD
			$query->execute();

			// Carga el resultado de la consulta
			$vVideojuegos=$query->fetchall();

			// Retorna la tabla con el resultado.
			// El resultado puede ser un tabla vacía perfectamente 
			return $vVideojuegos;
		}

		//--------------------------------------------------------------------
		// CONSULTAS SQL
		//--------------------------------------------------------------------
		const SQL_SELECT_TIPOS_VIDEOJUEGO = <<<SQL
			SELECT
				id_tipo_videojuego as id,
				nombre as texto
			FROM tipo_videojuegos vv
			where vv.nombre like ?;
		SQL;		

	}
?>