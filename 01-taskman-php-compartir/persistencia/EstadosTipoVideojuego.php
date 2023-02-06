<?php
class EstadosTipoVideojuego {
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonEstadosTipoVideojuego() {
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
		public function getSelectEstadosTipoVideojuego($filtro) {
        				
			// Prepara la consulta a la base de datos
			$query=$this->db->preparar($this::SQL_SELECT_ESTADOS_TIPO_VIDEOJUEGO);

			// Asigna los parámetros a la consulta. Reemplaza las ?
			// por los valores pasados como argumento
			$query->bindParam(1,$filtro);
			
			// Lanza la consulta contra la BD
			$query->execute();

			// Carga el resultado de la consulta
			$vEstados=$query->fetchall();

			// Retorna la tabla con el resultado.
			// El resultado puede ser un tabla vacía perfectamente 
			return $vEstados;
		}

		//--------------------------------------------------------------------
		// CONSULTAS SQL
		//--------------------------------------------------------------------
		const SQL_SELECT_ESTADOS_TIPO_VIDEOJUEGO = <<<SQL
			SELECT
				id_estado as id, 
				nombre as texto
			FROM estados_tipo_videojuegos vv
			where vv.id_tipo_videojuego = ?;
		SQL;		

	}
?>