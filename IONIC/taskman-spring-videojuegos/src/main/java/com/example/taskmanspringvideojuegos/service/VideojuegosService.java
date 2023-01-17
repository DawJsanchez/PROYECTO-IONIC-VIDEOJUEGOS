package com.example.taskmanspringvideojuegos.service;


import com.example.taskmanspringvideojuegos.model.entity.Videojuego;

import java.util.List;


public interface VideojuegosService {
    Videojuego get(long id);
    List<Videojuego> listAll();
    List<Videojuego> listByTitulo(String filterTitulo);
    Videojuego save(Videojuego videojuego);
    Videojuego update(Videojuego videojuego);
    void delete(long id);

    Object[] resumenEstadosVideojuegos();
}
