package com.example.taskmanspringvideojuegos.service;



import com.example.taskmanspringvideojuegos.model.entity.Etiqueta;

import java.util.List;


public interface EtiquetasService {
    Etiqueta get(long id);
    List<Etiqueta> listAll();
    Etiqueta save(Etiqueta etiqueta);
    Etiqueta update(Etiqueta etiqueta);
    void delete(long id);
}
