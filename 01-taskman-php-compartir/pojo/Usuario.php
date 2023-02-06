<?php 

class Usuario{

	private $idUsuario;
	private $usuario;
	private $password;
    private $nombreCompleto;
	private $rol;
	
	public function __construct($idUsuario, $usuario, $password,$nombreCompleto, $rol)
	{
		$this->idUsuario = $idUsuario;
		$this->usuario = $usuario;
		$this->password = $password;
        $this->nombreCompleto = $nombreCompleto;
		$this->rol = $rol;
	}
  

	/**
	 * Get the value of id_usuario
	 */ 
	public function getIdUsuario()
	{
		return $this->idUsuario;
	}

	/**
	 * Get the value of usuario
	 */ 
	public function getUsuario()
	{
		return $this->usuario;
	}

	/**
	 * Set the value of usuario
	 *
	 * @return  self
	 */ 
	public function setUsuario($usuario)
	{
		$this->usuario = $usuario;

		return $this;
	}

	/**
	 * Get the value of password
	 */ 
	public function getPassword()
	{
		return $this->password;
	}

	/**
	 * Set the value of password
	 *
	 * @return  self
	 */ 
	public function setPassword($password)
	{
		$this->password = $password;

		return $this;
	}

    /**
     * Get the value of nombreCompleto
     */ 
    public function getNombreCompleto()
    {
        return $this->nombreCompleto;
    }

    /**
     * Set the value of nombreCompleto
     *
     * @return  self
     */ 
    public function setNombreCompleto($nombreCompleto)
    {
        $this->nombreCompleto = $nombreCompleto;

        return $this;
    }

	/**
	 * Get the value of rol
	 */ 
	public function getRol()
	{
		return $this->rol;
	}

	/**
	 * Set the value of rol
	 *
	 * @return  self
	 */ 
	public function setRol($rol)
	{
		$this->rol = $rol;

		return $this;
	}

	/**
	 * Set the value of idUsuario
	 *
	 * @return  self
	 */ 
	public function setIdUsuario($idUsuario)
	{
		$this->idUsuario = $idUsuario;

		return $this;
	}

	public function isAdmin() {
		return $this->getRol() == 'admin';
	}
 }
 ?>
