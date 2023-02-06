<?php
class Videojuegos{
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonVideojuegos(){
			if(!isset(self::$instancia)){
				$miclase= __CLASS__;
				self::$instancia = new $miclase;
			}
			return self::$instancia;
		}

		public function addVideojuego(Videojuego $v){

			$consulta="INSERT INTO videojuegos (id_videojuego, titulo, id_informador, id_asignado, tipo_videojuego, estado, descripcion,
                         fecha_alta, fecha_vencimiento, hora_vencimiento)
						VALUES(null,?,?,?,?,?,?,?,?,?)";			

			$titulo = $v->getTitulo();
			$idInformador = $v->getIdInformador();
			$idAsignado = $v->getIdAsignado();
			$idTipoVideojuego = $v->getTipo();
			$idEstado = $v->getEstado();
			$descripcion = $v->getDescripcion();
			$fechaAlta = $v->getFechaAlta();
			$fechaVencimiento = $v->getFechaVencimiento();
			$horaVencimiento = $v->getHoraVencimiento();

			$query=$this->db->preparar($consulta);				
				$query->bindParam(1, $titulo);
				$query->bindParam(2, $idInformador);
				$query->bindParam(3, $idAsignado);
				$query->bindParam(4, $idTipoVideojuego);
				$query->bindParam(5, $idEstado);
				$query->bindParam(6, $descripcion);
				$query->bindParam(7, $fechaAlta);
				$query->bindParam(8, $fechaVencimiento);
				$query->bindParam(9, $horaVencimiento);

			// Si no se ha podido insertar lanza una excepción
			if(!$query->execute()) {
				throw new Exception("No se ha podido insertar el videojuego");
			}
			
			// Toma el ID que se ha generado en la BD y lo pone el objeto
			$v->setIdVideojuego($this->db->getUltimoId());

			return $v;
		}

		public function setVideojuego(Videojuego $v){

			$idVideojuego = $v->getIdVideojuego();
            $titulo = $v->getTitulo();
            $idInformador = $v->getIdInformador();
            $idAsignado = $v->getIdAsignado();
            $idTipoVideojuego = $v->getTipo();
            $idEstado = $v->getEstado();
            $descripcion = $v->getDescripcion();
            $fechaAlta = $v->getFechaAlta();
            $fechaVencimiento = $v->getFechaVencimiento();
            $horaVencimiento = $v->getHoraVencimiento();

			$query=$this->db->preparar($this::SQL_UPDATE_VIDEOJUEGO);
				$query->bindParam(1, $titulo);
				$query->bindParam(2, $idInformador);
				$query->bindParam(3, $idAsignado);
				$query->bindParam(4, $idTipoVideojuego);
				$query->bindParam(5, $idEstado);
				$query->bindParam(6, $descripcion);
				$query->bindParam(7, $fechaAlta);
				$query->bindParam(8, $fechaVencimiento);
				$query->bindParam(9, $horaVencimiento);

				$query->bindParam(10, $idVideojuego);

			// Si no se ha podido insertar lanza una excepción
			if(!$query->execute()) {
				throw new Exception("No se ha podido insertar la videojuego");
			}
			
			return $v;
		}

		public function getVideojuegoPorId($id){
			
			// Prepara la consulta a la base de datos
			$query=$this->db->preparar($this::SQL_VIDEOJUEGO_POR_ID);

			// Asigna los parámetros a la consulta. Reemplaza las ?
			// por los valores pasados como argumento
			$query->bindParam(1,$id);
			
			// Lanza la consulta contra la BD
			$query->execute();

			// Carga el resultado de la consulta
			$vVideojuegos=$query->fetchall();

			// Retorna el primer registro de la tabla
			return $vVideojuegos[0];
		}


		public function deleteVideojuego($id){
			
			// Prepara la consulta a la base de datos
			$query=$this->db->preparar($this::SQL_DELETE_VIDEOJUEGO);

			// Asigna los parámetros a la consulta. Reemplaza las ?
			// por los valores pasados como argumento
			$query->bindParam(1, $id);
			
			// Lanza la consulta contra la BD
			$query->execute();

			// Carga el resultado de la consulta
			$eliminados = $query->rowCount();

			// Retorna la tabla con el resultado.
			// El resultado puede ser un tabla vacía perfectamente 
			return $eliminados == 1;
		}
		

		/**
		 * Dado el filtro a aplicar sobre el título de la tarea, selecciona todas las tareas
		 * que dan coincidencia.
		 * 
		 * En el listado, se resuelven los datos que proceden de otras tablas. Por ejemplo,
		 * el informador o el usuario asignado, así como tipo, estado, etc.
		 */
		public function getListadoVideojuegosFiltradasPorTitulo($filtro){
        				
			// Prepara la consulta a la base de datos
			$query=$this->db->preparar($this::SQL_LISTADO_VIDEOJUEGOS_FILTRADAS_POR_TITULO);

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

		public function getResumenVideojuegosPorEstado(){
        				
			// Prepara la consulta a la base de datos
			$query=$this->db->preparar($this::SQL_RESUMEN_VIDEOJUEGOS_POR_ESTADO);
			
			// Lanza la consulta contra la BD
			$query->execute();

			// Carga el resultado de la consulta
			$vVideojuegos=$query->fetchall();

			// Retorna la tabla con el resultado.
			// El resultado puede ser un tabla vacía perfectamente 
			return $vVideojuegos;
		}

        public function getResumenVideojuegosPorTipo(){

            // Prepara la consulta a la base de datos
            $query=$this->db->preparar($this::SQL_RESUMEN_VIDEOJUEGOS_POR_TIPO);

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
		const SQL_VIDEOJUEGO_POR_ID = <<<SQL
			SELECT
				id_videojuego,
				titulo, 
				v.id_informador,
			    ui.usuario as informador,
				v.id_asignado,
				ua.usuario as asignado, 
				v.tipo_videojuego as id_tipo_videojuego,
				vv.nombre as tipo,
				v.estado as id_estado,
				evv.nombre as estado,
				descripcion, 
				fecha_alta, 
				fecha_vencimiento, 
				hora_vencimiento
			FROM videojuegos v
				inner join usuarios ui on v.id_informador = ui.id_usuario
				inner join usuarios ua on v.id_asignado = ua.id_usuario
				inner join tipo_videojuegos vv on v.tipo_videojuego = vv.id_tipo_videojuego
				inner join estados_tipo_videojuegos evv on v.estado = evv.id_estado
			where v.id_videojuego = ?;
		SQL;

		const SQL_LISTADO_VIDEOJUEGOS_FILTRADAS_POR_TITULO = <<<SQL
			SELECT
				id_videojuego,
				titulo, 
				v.id_informador,
				ui.usuario as informador, 
				v.id_asignado,
				ua.usuario as asignado, 
				v.tipo_videojuego as id_tipo_videojuego,
				vv.nombre as tipo, 
				v.estado as id_estado,
				etv.nombre as estado, 
				descripcion, 
				fecha_alta, 
				fecha_vencimiento, 
				hora_vencimiento
			FROM videojuegos v
				inner join usuarios ui on v.id_informador = ui.id_usuario
				inner join usuarios ua on v.id_asignado = ua.id_usuario
				inner join tipo_videojuegos vv on v.tipo_videojuego = vv.id_tipo_videojuego
				inner join estados_tipo_videojuegos etv on v.estado = etv.id_estado
			where v.titulo like ?;
		SQL;

		const SQL_DELETE_VIDEOJUEGO = <<<SQL
			delete from videojuegos where id_videojuego = ?;
		SQL;	

		const SQL_RESUMEN_VIDEOJUEGOS_POR_ESTADO = <<<SQL
			SELECT
				count(id_videojuego) as contador,
				evv.nombre as estado
			FROM videojuegos v
				inner join estados_tipo_videojuegos evv on v.estado = evv.id_estado
			group by evv.nombre
		SQL;

        const SQL_RESUMEN_VIDEOJUEGOS_POR_TIPO = <<<SQL
			SELECT
				count(id_videojuego) as contador,
				tv.nombre as tipo
			FROM videojuegos v
				left join tipo_videojuegos tv on v.tipo_videojuego = tv.id_tipo_videojuego
			group by tv.nombre
		SQL;

		const SQL_UPDATE_VIDEOJUEGO = <<< SQL
			UPDATE videojuegos set
				titulo = ?, 
				id_informador = ?, 
				id_asignado = ?, 
				tipo_videojuego = ?,
				estado = ?, 
				descripcion = ?, 
				fecha_alta = ?, 
				fecha_vencimiento = ?, 
				hora_vencimiento = ? 
			WHERE id_videojuego = ?
		SQL;
	}
?>