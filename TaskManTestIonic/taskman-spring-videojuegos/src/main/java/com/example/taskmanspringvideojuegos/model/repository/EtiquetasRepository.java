package com.example.taskmanspringvideojuegos.model.repository;

import com.example.taskmanspringvideojuegos.model.entity.Etiqueta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtiquetasRepository extends JpaRepository<Etiqueta, Long> {

}
