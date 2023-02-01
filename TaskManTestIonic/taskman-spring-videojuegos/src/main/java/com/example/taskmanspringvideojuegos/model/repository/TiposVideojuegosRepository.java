package com.example.taskmanspringvideojuegos.model.repository;

import com.example.taskmanspringvideojuegos.model.entity.TipoVideojuego;
import com.example.taskmanspringvideojuegos.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TiposVideojuegosRepository extends JpaRepository<TipoVideojuego, Long> {

    @Query("SELECT t FROM TipoVideojuego t WHERE t.nombre LIKE :filter")
    List<TipoVideojuego> searchAllByNombreContaining(String filter);

    @Query(value = "SELECT count(tv.id) as contador, tv.nombre FROM tipo_videojuegos tv group by tv.nombre", nativeQuery = true)
    Object[] resumenTipoVideojuegos();
}
