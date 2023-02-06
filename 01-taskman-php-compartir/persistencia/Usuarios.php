<?php
class Usuarios {
		
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

		public function addUsuario(Usuario $u){

			$consulta="INSERT INTO usuarios (id_usuario, usuario, password, nombre_completo, rol)
						VALUES(null,?,?,?,?)";

            $usuario=$u->getUsuario();
            $password=$u->getPassword();
            $nombreCompleto=$u->getNombreCompleto();
			$rol=$u->getRol();


			$query=$this->db->preparar($consulta);				
				$query->bindParam(1, $usuario);
				$query->bindParam(2, $password);
				$query->bindParam(3, $nombreCompleto);
				$query->bindParam(4, $rol);

			// Si no se ha podido insertar lanza una excepción
			if(!$query->execute()) {
				throw new Exception("No se ha podido insertar el usuario");
			}
			
			// Toma el ID que se ha generado en la BD y lo pone en el usuario
			$u->setIdUsuario($this->db->getUltimoId());

			return $u;
		}
        public function setUsuario(Usuario $u){

            $idUsuario = $u->getIdUsuario();
            $usuario = $u->getUsuario();
            $password = $u->getPassword();
            $nombreCompleto = $u->getNombreCompleto();
            $rol = $u->getRol();

            $query=$this->db->preparar($this::SQL_UPDATE_USUARIO);
            $query->bindParam(1, $usuario);
            $query->bindParam(2, $password);
            $query->bindParam(3, $nombreCompleto);
            $query->bindParam(4, $rol);

            $query->bindParam(5, $idUsuario);

        // Si no se ha podido insertar lanza una excepción
        if(!$query->execute()) {
            throw new Exception("No se ha podido insertar la videojuego");
        }
            return $u;
        }
        public function getUsuarioPorId($id){

            // Prepara la consulta a la base de datos
            $query=$this->db->preparar($this::SQL_USUARIO_POR_ID);

            // Asigna los parámetros a la consulta. Reemplaza las ?
            // por los valores pasados como argumento
            $query->bindParam(1,$id);

            // Lanza la consulta contra la BD
            $query->execute();

            // Carga el resultado de la consulta
            $uUsuarios=$query->fetchall();

            // Retorna el primer registro de la tabla
            return $uUsuarios[0];
        }

		/**
		 * Comprueba si el usuario existe y tiene la constraseña y retorna el ID
		 * si no existe o no puede cargarlo, retorna -1
		 */
		public function getIdUsuarioValido($usuario, $password){
			$id_usuario = -1;

			// Define la consulta
			$consulta="select id_usuario from usuarios where usuario=? and password=?";

			// Asigna los parámetros a la consulta
			$query=$this->db->preparar($consulta);				
				$query->bindParam(1, $usuario);
				$query->bindParam(2, $password);

			// Si no se ha podido insertar lanza una excepción
			if(!$query->execute()) {
				throw new Exception("No se ha podido insertar el usuario");
			}
			// Carga el registro
			$row = $query->fetchAll();
			if(isset($row[0][0])) {
				$id_usuario = $row[0][0];
			}

			return $id_usuario;
		}
        public function getUsuarioValido($usuario, $password){
            $id_usuario = -1;

            // Define la consulta
            $consulta="select id_usuario from usuarios where usuario=? and password=?";

            // Asigna los parámetros a la consulta
            $query=$this->db->preparar($consulta);
            $query->bindParam(1, $usuario);
            $query->bindParam(2, $password);

            // Si no se ha podido insertar lanza una excepción
            if(!$query->execute()) {
                throw new Exception("No se ha podido insertar el usuario");
            }
            // Carga el registro
            $row = $query->fetchAll();
            if(isset($row[0][0])) {
                $usuario = $row[0][0];
            }

            return $usuario;
        }


		/**
		 * Carga el objeto de tipo usuario dado el identificador
		 */
		public function getUsuario($id_usuario){

			$consulta="select id_usuario, usuario, password, nombre_completo, rol from usuarios where id_usuario=?";
			
			$query=$this->db->preparar($consulta);				
				$query->bindParam(1, $id_usuario);

			// Si no se ha podido insertar lanza una excepción
			if(!$query->execute()) {
				throw new Exception("No se ha podido cargar el usuario");
			}
			
			// Carga el registro
			$row = $query->fetchAll();

			// Crea ahora el objeto
			$usuario = new Usuario(
				$row[0][0],
				$row[0][1],
				$row[0][2],
				$row[0][3],
				$row[0][4]
			);

			return $usuario;
		}		

		/**
		 * Dado el filtro a aplicar sobre el nombre del usuario, selecciona todos los usuarios
		 * que dan coincidencia.
		 */
		public function getSelectPorNombre($filtro) {
        				
			// Prepara la consulta a la base de datos
			$query=$this->db->preparar($this::SQL_SELECT_USUARIOS_POR_NOMBRE);

			// Asigna los parámetros a la consulta. Reemplaza las ?
			// por los valores pasados como argumento
			$query->bindParam(1,$filtro);
			
			// Lanza la consulta contra la BD
			$query->execute();

			// Carga el resultado de la consulta
			$tTareas=$query->fetchall();

			// Retorna la tabla con el resultado.
			// El resultado puede ser un tabla vacía perfectamente 
			return $tTareas;
		}
        public function getListadoUsuariosFiltradasPorNombreCompleto($filtro){

            // Prepara la consulta a la base de datos
            $query=$this->db->preparar($this::SQL_LISTADO_USUARIOS_FILTRADAS_POR_NOMBRECOMPLETO);

            // Asigna los parámetros a la consulta. Reemplaza las ?
            // por los valores pasados como argumento
            $query->bindParam(1,$filtro);

            // Lanza la consulta contra la BD
            $query->execute();

            // Carga el resultado de la consulta
            $uUsuarios=$query->fetchall();

            // Retorna la tabla con el resultado.
            // El resultado puede ser un tabla vacía perfectamente
            return $uUsuarios;
        }
        public function deleteUsuario($id){

            // Prepara la consulta a la base de datos
            $query=$this->db->preparar($this::SQL_DELETE_USUARIO);

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
        public function getResumenUsuariosPorRol(){
            $query=$this->db->preparar($this::SQL_RESUMEN_USUARIOS_POR_ROL);
            $query->execute();
            $uUsuarios=$query->fetchall();
            return $uUsuarios;
        }

		//--------------------------------------------------------------------
		// CONSULTAS SQL
		//--------------------------------------------------------------------
        const SQL_USUARIO_POR_ID = <<<SQL
			SELECT
				id_usuario,
				usuario,
				nombre_completo, 
				rol
			FROM usuarios u
			where u.id_usuario = ?;
		SQL;
		const SQL_SELECT_USUARIOS_POR_NOMBRE = <<<SQL
			SELECT
				id_usuario as id, 
				usuario as texto
			FROM usuarios u
			where u.nombre_completo like ?;
		SQL;

        const SQL_LISTADO_USUARIOS_FILTRADAS_POR_NOMBRECOMPLETO = <<<SQL
			SELECT
				id_usuario,
				usuario,  
				nombre_completo,  
				rol
			FROM usuarios u
			where u.nombre_completo like ?;
		SQL;
        const SQL_DELETE_USUARIO = <<<SQL
			delete from usuarios where id_usuario = ?;
		SQL;

        const SQL_RESUMEN_USUARIOS_POR_ROL = <<<SQL
		    SELECT
		        count(id_usuario) as contador, rol
		        FROM usuarios
		        GROUP BY rol
		SQL;

        const SQL_UPDATE_USUARIO = <<< SQL
			UPDATE usuarios set
				usuario = ?, 
				password = ?, 
				nombre_completo = ?, 
				rol = ?
			WHERE id_usuario = ?
		SQL;

	}
?>