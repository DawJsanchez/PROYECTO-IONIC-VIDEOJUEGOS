<?php 

class EstadoTipoVideojuego {

	private $idTipoVideojuego;
	private $idEstado;
    private $nombre;
	
	public function __construct($idTipoVideojuego, $idEstado, $nombre)
	{
		$this->idTipoVideojuego = $idTipoVideojuego;
		$this->idEstado = $idEstado;
        $this->nombre = $nombre;
    }  


	/**
	 * Get the value of idTipoTarea
	 */ 
	public function getIdTipoVideojuego()
	{
		return $this->idTipoVideojuego;
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

	/**
	 * Get the value of idEstado
	 */ 
	public function getIdEstado()
	{
		return $this->idEstado;
	}

	/**
	 * Set the value of idEstado
	 *
	 * @return  self
	 */ 
	public function setIdEstado($idEstado)
	{
		$this->idEstado = $idEstado;

		return $this;
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
}
?>
