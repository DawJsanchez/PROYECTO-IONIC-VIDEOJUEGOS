package com.example.taskmanspringvideojuegos.service.impl;


import com.example.taskmanspringvideojuegos.model.entity.Videojuego;
import com.example.taskmanspringvideojuegos.model.repository.VideojuegosRepository;
import com.example.taskmanspringvideojuegos.service.VideojuegosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
public class VideojuegosServiceImpl implements VideojuegosService {

    @Autowired
    private VideojuegosRepository videojuegosRepository;

    @Override
    @Transactional(readOnly = true)
    public Videojuego get(long id) {
        return videojuegosRepository.findById(id).get();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Videojuego> listAll() {
        List<Videojuego> videojuegos = videojuegosRepository.findAll();
        return videojuegos;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Videojuego> listByTitulo(String filterTitulo) {
        return videojuegosRepository.searchAllByTituloContaining(filterTitulo);
    }

    @Transactional
    @Override
    public Videojuego save(Videojuego videojuego) {
        try {
            videojuego.setId(null);
            videojuego = videojuegosRepository.save(videojuego);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return videojuego;
    }

    @Transactional
    @Override
    public Videojuego update(Videojuego videojuego) {
        // TODO Revisar los campos created at. Según parece podrían estarse actualizando
        // al llamar a actualizar. Lo siguiente se hace para prevenilo.
        Videojuego old;
        try {
            old = videojuegosRepository.findById(videojuego.getId()).get();
            videojuego.setCreatedAt(old.getCreatedAt());
            videojuegosRepository.save(videojuego);
        } catch (Exception ex) {
            old=null;
        }
        return old;
    }

    @Transactional
    @Override
    public void delete(long id) {
        videojuegosRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Object[] resumenEstadosVideojuegos() {
        return videojuegosRepository.resumenEstadosVideojuegos();
    }


}

