package com.example.taskmanspringvideojuegos.service;



import com.example.taskmanspringvideojuegos.model.entity.EstadoTipoVideojuego;

import java.util.List;


public interface EstadosTipoVideojuegosService {
    EstadoTipoVideojuego get(long id);
    List<EstadoTipoVideojuego> listAll();
    EstadoTipoVideojuego save(EstadoTipoVideojuego estadoTipoVideojuego);
    EstadoTipoVideojuego update(EstadoTipoVideojuego estadoTipoVideojuego);
    void delete(long id);

    List<EstadoTipoVideojuego> listByTipoVideojuego(long id);

}
