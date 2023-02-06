<?php 

class Comentario{

	private $idTarea;
    private $idComentario;
    private $texto;
	
	public function __construct($idTarea, $idComentario, $texto)
	{
		$this->idTarea = $idTarea;
		$this->idComentario = $idComentario;
        $this->texto = $texto;
	}   

	/**
	 * Get the value of idTarea
	 */ 
	public function getIdTarea()
	{
		return $this->idTarea;
	}

	/**
	 * Set the value of idTarea
	 *
	 * @return  self
	 */ 
	public function setIdTarea($idTarea)
	{
		$this->idTarea = $idTarea;

		return $this;
	}

    /**
     * Get the value of idComentario
     */ 
    public function getIdComentario()
    {
        return $this->idComentario;
    }

    /**
     * Set the value of idComentario
     *
     * @return  self
     */ 
    public function setIdComentario($idComentario)
    {
        $this->idComentario = $idComentario;

        return $this;
    }

    /**
     * Get the value of texto
     */ 
    public function getTexto()
    {
        return $this->texto;
    }

    /**
     * Set the value of texto
     *
     * @return  self
     */ 
    public function setTexto($texto)
    {
        $this->texto = $texto;

        return $this;
    }
 }
 ?>
