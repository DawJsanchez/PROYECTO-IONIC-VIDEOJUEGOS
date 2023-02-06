<?php
class LnVideojuegos {
		
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
		/**
		 * En caso de error este método podría lanzar una excepción
		 */
		public function addVideojuego(Videojuego $v){
			// Carga el singleton de juegos
			$videojuegos = Videojuegos::singletonVideojuegos();

			// Añade la tarea
			$videojuegos->addVideojuego($v);
			
			return $v;
		}

		/**
		 * Actualiza la tarea
		 */
		public function setVideojuego(Videojuego $v){
			
			// Carga el singleton de juegos
			$videojuegos = Videojuegos::singletonVideojuegos();
			// Inserta el videojuego
			$videojuegos->setVideojuego($v);
			
			return $v;
		}

		public function getVideojuegoPorId($id){

			$videojuegos = Videojuegos::singletonVideojuegos();
			// Carga la tabla de videojuegos
			$r = $videojuegos->getVideojuegoPorId($id);
			// Retorna el juego
			return $r;
		}

		public function getListadoVideojuegosFiltradasPorTitulo($filtro){

			// Carga el singleton de videojuegos
			$videojuegos = Videojuegos::singletonVideojuegos();
			// Carga la tabla
			$r = $videojuegos->getListadoVideojuegosFiltradasPorTitulo($filtro);
			// Retorna la tabla de juegos
			return $r;
		}

		public function getResumenVideojuegosPorEstado() {
			// Carga el singleton
			$videojuegos = Videojuegos::singletonVideojuegos();
			// Carga la tabla de juegos x9019123 vez
			$r = $videojuegos->getResumenVideojuegosPorEstado();
			// Retorna el resultado
			return $r;
		}
        public function getResumenVideojuegosPorTipo() {
            // Carga el singleton
            $videojuegos = Videojuegos::singletonVideojuegos();
            // Carga la tabla de juegos x9019123 vez
            $r = $videojuegos->getResumenVideojuegosPorTipo();
            // Retorna el resultado
            return $r;
        }

		public function deleteVideojuego($id){

			$videojuegos = Videojuegos::singletonVideojuegos();

			$r = $videojuegos->deleteVideojuego($id);

			return $r;
		}
	}
?>