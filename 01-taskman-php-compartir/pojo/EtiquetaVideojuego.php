<?php 

class EtiquetaVideojuego{

	private $idEtiqueta;
    private $idVideojuego;
	
	public function __construct($idEtiqueta, $idVideojuego)
	{
		$this->idEtiqueta = $idEtiqueta;
		$this->idVideojuego = $idVideojuego;
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
     * Get the value of idTarea
     */ 
    public function getIdVideojuego()
    {
        return $this->idVideojuego;
    }

    /**
     * Set the value of idTarea
     *
     * @return  self
     */ 
    public function setIdVideojuego($idVideojuego)
    {
        $this->idVideojuego = $idVideojuego;

        return $this;
    }
 }
 ?>
