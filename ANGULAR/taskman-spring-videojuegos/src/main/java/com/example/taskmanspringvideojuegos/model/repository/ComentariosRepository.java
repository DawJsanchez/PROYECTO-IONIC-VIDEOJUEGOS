package com.example.taskmanspringvideojuegos.model.repository;

import com.example.taskmanspringvideojuegos.model.entity.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComentariosRepository extends JpaRepository<Comentario, Long> {

}
