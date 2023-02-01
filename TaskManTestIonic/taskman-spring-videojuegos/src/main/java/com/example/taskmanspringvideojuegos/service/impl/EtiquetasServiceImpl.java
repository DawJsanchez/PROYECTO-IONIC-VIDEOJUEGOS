package com.example.taskmanspringvideojuegos.service.impl;


import com.example.taskmanspringvideojuegos.model.entity.Etiqueta;
import com.example.taskmanspringvideojuegos.model.repository.EtiquetasRepository;
import com.example.taskmanspringvideojuegos.service.EtiquetasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
public class EtiquetasServiceImpl implements EtiquetasService {
    @Autowired
    private EtiquetasRepository etiquetasRepository;

    @Override
    public Etiqueta get(long id) {
        return etiquetasRepository.findById(id).get();
    }

    @Override
    public List<Etiqueta> listAll() {
        return etiquetasRepository.findAll();
    }

    @Transactional
    @Override
    public Etiqueta save(Etiqueta etiqueta) {
        try {
            etiquetasRepository.save(etiqueta);
        } catch (Exception ex) {
        }
        return etiqueta;
    }
    @Transactional
    @Override
    public Etiqueta update(Etiqueta etiqueta) {
        Etiqueta old;
        try {
            old = etiquetasRepository.findById(etiqueta.getId()).get();
            etiqueta.setCreatedAt(old.getCreatedAt());
            etiquetasRepository.save(etiqueta);
        } catch (Exception ex) {
            old=null;
        }
        return old;
    }
    @Transactional
    @Override
    public void delete(long id) {
        etiquetasRepository.deleteById(id);
    }


}
