package com.example.taskmanspringvideojuegos.service.impl;


import com.example.taskmanspringvideojuegos.model.entity.Comentario;
import com.example.taskmanspringvideojuegos.model.repository.ComentariosRepository;
import com.example.taskmanspringvideojuegos.service.ComentariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
public class ComentariosServiceImpl implements ComentariosService {
    @Autowired
    private ComentariosRepository comentariosRepository;

    @Override
    public Comentario get(long id) {
        return comentariosRepository.findById(id).get();
    }

    @Override
    public List<Comentario> listAll() {
        return comentariosRepository.findAll();
    }

    @Transactional
    @Override
    public Comentario save(Comentario comentario) {
        try {
            comentariosRepository.save(comentario);
        } catch (Exception ex) {
        }
        return comentario;
    }

    @Transactional
    @Override
    public Comentario update(Comentario comentario) {
        Comentario old;
        try {
            old = comentariosRepository.findById(comentario.getId()).get();
            comentario.setCreatedAt(old.getCreatedAt());
            comentariosRepository.save(comentario);
        } catch (Exception ex) {
            old=null;
        }
        return old;
    }
    @Transactional
    @Override
    public void delete(long id) {
        comentariosRepository.deleteById(id);
    }


}
