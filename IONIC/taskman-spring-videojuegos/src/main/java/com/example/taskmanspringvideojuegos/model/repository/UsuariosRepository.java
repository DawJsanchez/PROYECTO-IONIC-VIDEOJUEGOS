package com.example.taskmanspringvideojuegos.model.repository;


import com.example.taskmanspringvideojuegos.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuario, Long> {

    Usuario findByUsername(String username);

    @Query("SELECT u FROM Usuario u WHERE u.username LIKE :filter")
    List<Usuario> searchAllByUsernameContaining(String filter);

    @Query(value = "SELECT count(u.id) as contador, u.rol FROM usuarios u group by u.rol", nativeQuery = true)
    Object[] resumenRolUsuarios();
}
