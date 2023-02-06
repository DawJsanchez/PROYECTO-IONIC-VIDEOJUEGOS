<?php
class Etiquetas{
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonEtiquetas(){
			if(!isset(self::$instancia)){
				$miclase= __CLASS__;
				self::$instancia = new $miclase;
			}
			return self::$instancia;
		}

		public function addEtiqueta(Etiqueta $e){

			$consulta="INSERT INTO etiquetas (id_etiqueta, nombre) 
						VALUES(null,?)";
			
			$nombre = $e->getNombre();

			$query=$this->db->preparar($consulta);							
			$query->bindParam(1, $nombre);

			// Si no se ha podido insertar lanza una excepción
			if(!$query->execute()) {
				throw new Exception("No se ha podido insertar la etiqueta");
			}
			
			// Toma el ID que se ha generado en la BD y lo pone el objeto
			$e->setIdEtiqueta($this->db->getUltimoId());

			return $e;
		}

		/**
		 * Dado el filtro a aplicar sobre el nombre del tipo, devuelve
		 * los tipos
		 */
		public function getSelectEtiquetasPorNombre($filtro) {
        				
			// Prepara la consulta a la base de datos
			$query=$this->db->preparar($this::SQL_SELECT_ETIQUETAS_POR_NOMBRE);

			// Asigna los parámetros a la consulta. Reemplaza las ?
			// por los valores pasados como argumento
			$query->bindParam(1,$filtro);
			
			// Lanza la consulta contra la BD
			$query->execute();

			// Carga el resultado de la consulta
			$tEtiquetas=$query->fetchall();

			// Retorna la tabla con el resultado.
			// El resultado puede ser un tabla vacía perfectamente 
			return $tEtiquetas;
		}

		/**
		 * Dado el filtro a aplicar sobre el nombre del tipo, devuelve
		 * los tipos
		 */
		public function getEtiquetaPorNombre($filtro) {
        				
			// Prepara la consulta a la base de datos
			$query=$this->db->preparar($this::SQL_SELECT_ETIQUETA_POR_NOMBRE);

			// Asigna los parámetros a la consulta. Reemplaza las ?
			// por los valores pasados como argumento
			$query->bindParam(1,$filtro);
			
			// Lanza la consulta contra la BD
			$query->execute();

			// Carga el resultado de la consulta
			$tEtiquetas=$query->fetchall();

			if(count($tEtiquetas) > 0) {
				return new Etiqueta($tEtiquetas[0][0], $tEtiquetas[0][1]);
			}

			// Retorna la tabla con el resultado.
			// El resultado puede ser un tabla vacía perfectamente 
			return null;
		}


		//--------------------------------------------------------------------
		// CONSULTAS SQL
		//--------------------------------------------------------------------
		const SQL_SELECT_ETIQUETAS_POR_NOMBRE = <<<SQL
			SELECT
				id_etiqueta as id, 
				nombre as texto
			FROM etiquetas 
			where nombre like ?;
		SQL;		

		const SQL_SELECT_ETIQUETA_POR_NOMBRE = <<<SQL
			SELECT
				id_etiqueta as id, 
				nombre as texto
			FROM etiquetas 
			where nombre = ?;
		SQL;		

	}
?>