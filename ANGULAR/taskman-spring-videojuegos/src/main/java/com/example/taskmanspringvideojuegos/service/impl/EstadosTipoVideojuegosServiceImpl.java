package com.example.taskmanspringvideojuegos.service.impl;

import com.example.taskmanspringvideojuegos.model.entity.EstadoTipoVideojuego;
import com.example.taskmanspringvideojuegos.model.repository.EstadosTipoVideojuegosRepository;
import com.example.taskmanspringvideojuegos.service.EstadosTipoVideojuegosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
public class EstadosTipoVideojuegosServiceImpl implements EstadosTipoVideojuegosService {

    @Autowired
    private EstadosTipoVideojuegosRepository estadosTipoVideojuegosRepository;

    @Override
    public EstadoTipoVideojuego get(long id) {
        return estadosTipoVideojuegosRepository.findById(id).get();
    }

    @Override
    public List<EstadoTipoVideojuego> listAll() {
        return estadosTipoVideojuegosRepository.findAll();
    }

    @Transactional
    @Override
    public EstadoTipoVideojuego save(EstadoTipoVideojuego estadoTipoVideojuego) {
        try {
            estadosTipoVideojuegosRepository.save(estadoTipoVideojuego);
        } catch (Exception ex) {
        }
        return estadoTipoVideojuego;
    }
    @Transactional
    @Override
    public EstadoTipoVideojuego update(EstadoTipoVideojuego estadoTipoVideojuego) {
        EstadoTipoVideojuego old;
        try {
            old = estadosTipoVideojuegosRepository.findById(estadoTipoVideojuego.getId()).get();
            estadoTipoVideojuego.setCreatedAt(old.getCreatedAt());
            estadosTipoVideojuegosRepository.save(estadoTipoVideojuego);
        } catch (Exception ex) {
            old=null;
        }
        return old;
    }
    @Transactional
    @Override
    public void delete(long id) {
        estadosTipoVideojuegosRepository.deleteById(id);
    }

    @Override
    public List<EstadoTipoVideojuego> listByTipoVideojuego(long id) {
        return estadosTipoVideojuegosRepository.listByTipoVideojuego(id);
    }


}
