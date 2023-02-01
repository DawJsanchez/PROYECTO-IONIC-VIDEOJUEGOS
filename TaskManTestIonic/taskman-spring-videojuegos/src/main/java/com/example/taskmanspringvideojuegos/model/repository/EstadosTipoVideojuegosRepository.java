package com.example.taskmanspringvideojuegos.model.repository;

import com.example.taskmanspringvideojuegos.model.entity.EstadoTipoVideojuego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstadosTipoVideojuegosRepository extends JpaRepository<EstadoTipoVideojuego, Long> {

    @Query("SELECT e FROM EstadoTipoVideojuego e WHERE e.tipoVideojuego.id = :id")
    List<EstadoTipoVideojuego> listByTipoVideojuego(long id);
}
