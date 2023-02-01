package com.example.taskmanspringvideojuegos.model.repository;

import com.example.taskmanspringvideojuegos.model.entity.Videojuego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideojuegosRepository extends JpaRepository<Videojuego, Long> {

    @Query("SELECT v FROM Videojuego v WHERE v.titulo LIKE :filter")
    List<Videojuego> searchAllByTituloContaining(String filter);

    @Query(value = "SELECT count(v.id) as contador, etv.nombre as estado  FROM videojuegos v inner join estados_tipo_videojuegos etv on v.estado_tipo_videojuego_id = etv.id group by etv.nombre", nativeQuery = true)
    Object[] resumenEstadosVideojuegos();

}

