<?php 

class Etiqueta{

	private $idEtiqueta;
    private $nombre;
	
	public function __construct($idEtiqueta, $nombre)
	{
		$this->idEtiqueta = $idEtiqueta;
		$this->nombre = $nombre;
	}
  


	/**
	 * Get the value of idEtiqueta
	 */ 
	public function getIdEtiqueta()
	{
		return $this->idEtiqueta;
	}

	/**
	 * Set the value of idEtiqueta
	 *
	 * @return  self
	 */ 
	public function setIdEtiqueta($idEtiqueta)
	{
		$this->idEtiqueta = $idEtiqueta;

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
