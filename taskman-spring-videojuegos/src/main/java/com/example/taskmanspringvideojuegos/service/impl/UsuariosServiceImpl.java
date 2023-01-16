package com.example.taskmanspringvideojuegos.service.impl;


import com.example.taskmanspringvideojuegos.model.entity.Usuario;
import com.example.taskmanspringvideojuegos.model.entity.Videojuego;
import com.example.taskmanspringvideojuegos.model.repository.UsuariosRepository;
import com.example.taskmanspringvideojuegos.service.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
public class UsuariosServiceImpl implements UsuariosService {
    @Autowired
    private UsuariosRepository usuariosRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Usuario get(long id) {
        return usuariosRepository.findById(id).get();
    }

    @Override
    public List<Usuario> listAll() {
        return usuariosRepository.findAll();
    }

    @Transactional
    @Override
    public Usuario save(Usuario usuario) {

        try {
            usuario.setId(null);
            usuario = usuariosRepository.save(usuario);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return usuario;
    }

    @Transactional
    @Override
    public Usuario update(Usuario usuario) {
        Usuario old;
        try{
            old = usuariosRepository.findById(usuario.getId()).get();
            usuario.setCreatedAt(old.getCreatedAt());
            usuariosRepository.save(usuario);
        }catch (Exception ex){
            old=null;
        }
        return old;
    }

    @Transactional
    @Override
    public void delete(long id) {
        usuariosRepository.deleteById(id);
    }



    @Override
    public Usuario listByUsername(String username) {
        return usuariosRepository.findByUsername(username);
    }

    @Override
    public Usuario listByUsernameAnPassword(String username, String password) {
        Usuario usuario = usuariosRepository.findByUsername(username);
        if (usuario!=null && !passwordEncoder.matches(password, usuario.getPassword()))
            usuario = null;
        return usuario;
    }

    @Override
    public List<Usuario> searchAllByUsernameContaining(String filter) {
        return usuariosRepository.searchAllByUsernameContaining(filter);
    }

    @Override
    @Transactional(readOnly = true)
    public Object[] resumenRolUsuarios() {
        return usuariosRepository.resumenRolUsuarios();
    }
}
