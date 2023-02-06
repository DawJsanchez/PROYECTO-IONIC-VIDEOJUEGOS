<?php 

class Videojuego{

	private $idVideojuego;
    private $titulo;
    private $idInformador;
    private $idAsignado;
    private $tipo;
    private $estado;
    private $descripcion;
    private $fechaAlta;
    private $fechaVencimiento;
    private $horaVencimiento;
	
	public function __construct(
        $idVideojuego,
        $titulo,
        $idInformador,
        $idAsignado,
        $tipo,
        $estado,
        $descripcion,
        $fechaAlta,
        $fechaVencimiento,
        $horaVencimiento       
    ) {
        $this->idVideojuego = $idVideojuego;
        $this->titulo = $titulo;
        $this->idInformador = $idInformador;
        $this->idAsignado = $idAsignado;
        $this->tipo = $tipo;
        $this->estado = $estado;
        $this->descripcion = $descripcion;
        $this->fechaAlta = $fechaAlta;
        $this->fechaVencimiento = $fechaVencimiento;
        $this->horaVencimiento = $horaVencimiento;
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

    /**
     * Get the value of titulo
     */ 
    public function getTitulo()
    {
        return $this->titulo;
    }

    /**
     * Set the value of titulo
     *
     * @return  self
     */ 
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;

        return $this;
    }

    /**
     * Get the value of idInformador
     */ 
    public function getIdInformador()
    {
        return $this->idInformador;
    }

    /**
     * Set the value of idInformador
     *
     * @return  self
     */ 
    public function setIdInformador($idInformador)
    {
        $this->idInformador = $idInformador;

        return $this;
    }

    /**
     * Get the value of idAsignado
     */ 
    public function getIdAsignado()
    {
        return $this->idAsignado;
    }

    /**
     * Set the value of idAsignado
     *
     * @return  self
     */ 
    public function setIdAsignado($idAsignado)
    {
        $this->idAsignado = $idAsignado;

        return $this;
    }

    /**
     * Get the value of tipo
     */ 
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * Set the value of tipo
     *
     * @return  self
     */ 
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;

        return $this;
    }

    /**
     * Get the value of estado
     */ 
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * Set the value of estado
     *
     * @return  self
     */ 
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * Get the value of descripcion
     */ 
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set the value of descripcion
     *
     * @return  self
     */ 
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * Get the value of fechaAlta
     */ 
    public function getFechaAlta()
    {
        return $this->fechaAlta;
    }

    /**
     * Set the value of fechaAlta
     *
     * @return  self
     */ 
    public function setFechaAlta($fechaAlta)
    {
        $this->fechaAlta = $fechaAlta;

        return $this;
    }

    /**
     * Get the value of fechaVencimiento
     */ 
    public function getFechaVencimiento()
    {
        return $this->fechaVencimiento;
    }

    /**
     * Set the value of fechaVencimiento
     *
     * @return  self
     */ 
    public function setFechaVencimiento($fechaVencimiento)
    {
        $this->fechaVencimiento = $fechaVencimiento;

        return $this;
    }

    /**
     * Get the value of horaVencimiento
     */ 
    public function getHoraVencimiento()
    {
        return $this->horaVencimiento;
    }

    /**
     * Set the value of horaVencimiento
     *
     * @return  self
     */ 
    public function setHoraVencimiento($horaVencimiento)
    {
        $this->horaVencimiento = $horaVencimiento;

        return $this;
    }
 }
 ?>
