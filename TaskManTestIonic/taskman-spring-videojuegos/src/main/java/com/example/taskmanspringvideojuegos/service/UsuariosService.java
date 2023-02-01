package com.example.taskmanspringvideojuegos.service;



import com.example.taskmanspringvideojuegos.model.entity.Usuario;

import java.util.List;

public interface UsuariosService {
    Usuario get(long id);
    List<Usuario> listAll();
    Usuario save(Usuario usuario);
    Usuario update(Usuario usuario);
    void delete(long id);

    Usuario listByUsername(String username);
    Usuario listByUsernameAnPassword(String username, String password);
    List<Usuario> searchAllByUsernameContaining(String filter);
    Object[] resumenRolUsuarios();
}
