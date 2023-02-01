package com.example.taskmanspringvideojuegos.service;



import com.example.taskmanspringvideojuegos.model.entity.Comentario;

import java.util.List;


public interface ComentariosService {
    Comentario get(long id);
    List<Comentario> listAll();
    Comentario save(Comentario comentario);
    Comentario update(Comentario comentario);
    void delete(long id);
}
