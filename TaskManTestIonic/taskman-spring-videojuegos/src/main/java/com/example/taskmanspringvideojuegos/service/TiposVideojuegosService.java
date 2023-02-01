package com.example.taskmanspringvideojuegos.service;



import com.example.taskmanspringvideojuegos.model.entity.TipoVideojuego;
import com.example.taskmanspringvideojuegos.model.entity.Usuario;

import java.util.List;


public interface TiposVideojuegosService {
    TipoVideojuego get(long id);
    List<TipoVideojuego> listAll();
    TipoVideojuego save(TipoVideojuego tipoVideojuego);
    TipoVideojuego update(TipoVideojuego tipoVideojuego);
    void delete(long id);

    List<TipoVideojuego> searchAllByNombreContaining(String filter);
    Object[] resumenTipoVideojuegos();
}
