<?php 

class TipoVideojuego{

	private $idTipoVideojuego;
	private $nombre;
	
	public function __construct($idTipoVideojuego, $nombre)
	{
		$this->idTipoVideojuego = $idTipoVideojuego;
		$this->nombre = $nombre;
	}
  

	/**
	 * Get the value of id_tipo_tarea
	 */ 
	public function getIdTipoVideojuego()
	{
		return $this->idTipoVideojuego;
	}

	/**
	 * Get the value of nombre
	 */ 
	public function getNombre()
	{
		return $this->nombre;
	}

	/**
	 * Set the value of nombre
	 *
	 * @return  self
	 */ 
	public function setNombre($nombre)
	{
		$this->nombre = $nombre;

		return $this;
	}

	/**
	 * Set the value of idTipoTarea
	 *
	 * @return  self
	 */ 
	public function setIdTipoVideojuego($idTipoVideojuego)
	{
		$this->idTipoVideojuego = $idTipoVideojuego;

		return $this;
	}
 }
 ?>
