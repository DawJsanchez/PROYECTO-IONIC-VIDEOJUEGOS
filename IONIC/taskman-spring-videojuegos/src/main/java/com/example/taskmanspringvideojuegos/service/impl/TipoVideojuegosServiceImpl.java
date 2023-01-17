package com.example.taskmanspringvideojuegos.service.impl;

import com.example.taskmanspringvideojuegos.model.entity.TipoVideojuego;
import com.example.taskmanspringvideojuegos.model.entity.Usuario;
import com.example.taskmanspringvideojuegos.model.repository.TiposVideojuegosRepository;
import com.example.taskmanspringvideojuegos.service.TiposVideojuegosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
public class TipoVideojuegosServiceImpl implements TiposVideojuegosService {

    @Autowired
    private TiposVideojuegosRepository tiposVideojuegosRepository;

    @Override
    public TipoVideojuego get(long id) {
        return tiposVideojuegosRepository.findById(id).get();
    }

    @Override
    public List<TipoVideojuego> listAll() {
        return tiposVideojuegosRepository.findAll();
    }

    @Transactional
    @Override
    public TipoVideojuego save(TipoVideojuego tipoVideojuego) {
        try {
            tipoVideojuego.setId(null);
            tiposVideojuegosRepository.save(tipoVideojuego);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return tipoVideojuego;
    }

    @Transactional
    @Override
    public TipoVideojuego update(TipoVideojuego tipoVideojuego) {
        TipoVideojuego old;
        try {
            old = tiposVideojuegosRepository.findById(tipoVideojuego.getId()).get();
            tipoVideojuego.setCreatedAt(old.getCreatedAt());
            tiposVideojuegosRepository.save(tipoVideojuego);
        } catch (Exception ex) {
            old=null;
        }
        return old;
    }

    @Transactional
    @Override
    public void delete(long id) {
        tiposVideojuegosRepository.deleteById(id);
    }

    @Override
    public List<TipoVideojuego> searchAllByNombreContaining(String filter) {
        return tiposVideojuegosRepository.searchAllByNombreContaining(filter);
    }

    @Override
    @Transactional(readOnly = true)
    public Object[] resumenTipoVideojuegos() {
        return tiposVideojuegosRepository.resumenTipoVideojuegos();
    }

}
