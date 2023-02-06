<?php
class Comentarios{
		
		private static $instancia;
		private $db;

		function __construct() {
			$this->db = Conexion::singleton_conexion();
		}

		public static function singletonComentarios(){
			if(!isset(self::$instancia)){
				$miclase= __CLASS__;
				self::$instancia = new $miclase;
			}
			return self::$instancia;
		}

		public function addComentario(Comentario $c){

			$consulta="INSERT INTO etiquetas_videojuego (id_videojuego, id_comentario, texto)
						VALUES(?,null,?)";
			
			$query=$this->db->preparar($consulta);				
				$query->bindParam(1, $c->getIdVideojuego());
				$query->bindParam(2, $c->getTexto());

			// Si no se ha podido insertar lanza una excepción
			if(!$query->execute()) {
				throw new Exception("No se ha podido insertar el comentario");
			}
			
			// Toma el ID que se ha generado en la BD y lo pone el objeto
			$c->setIdComentario($db->getUltimoId());			

			return $c;
		}
	}
?>