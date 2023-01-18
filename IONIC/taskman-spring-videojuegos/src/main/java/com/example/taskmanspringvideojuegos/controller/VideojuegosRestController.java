package com.example.taskmanspringvideojuegos.controller;

import com.example.taskmanspringvideojuegos.model.entity.Videojuego;
import com.example.taskmanspringvideojuegos.service.VideojuegosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/videojuegos")
public class VideojuegosRestController {
    
    @Autowired
    private VideojuegosService videojuegosService;

    @GetMapping("")
    public ResponseEntity<List<Videojuego>> list() {
        List videojuegos = videojuegosService.listAll();
        return new ResponseEntity<>(videojuegos, null, HttpStatus.OK);
    }

    @PostMapping("/por-titulo")
    public ResponseEntity<List<Videojuego>> list(@RequestBody HashMap<String, String> args) {

        // Obtiene el filtro
        String filtro = args.get("filtro");

        // Hace la búsqueda
        List videojuegos = videojuegosService.listByTitulo(filtro);
        return new ResponseEntity<>(videojuegos, null, HttpStatus.OK);
    }

    @GetMapping("/resumen-videojuegos")
    public ResponseEntity<Object[]> resumen() {
        Object[] videojuegos = videojuegosService.resumenEstadosVideojuegos();
        return new ResponseEntity<>(videojuegos, null, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Videojuego> get(@PathVariable long id) {
        try {
            Videojuego videojuego = videojuegosService.get(id);
            return new ResponseEntity(videojuego, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No existe la tarea con id: " + id, null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Videojuego> create(@RequestBody Videojuego videojuego) {
        try {
            Videojuego result = videojuegosService.save(videojuego);
            return new ResponseEntity(videojuego, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No se pudo crear el videojuego: " + videojuego.toString(), null, HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        try {
            Videojuego videojuego = videojuegosService.get(id);
            videojuegosService.delete(id);
            return new ResponseEntity(videojuego, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No se pudo borrar el videojuego con id: " + id, null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody Videojuego videojuego) {
        try {
            videojuego = videojuegosService.update(videojuego);
            return new ResponseEntity(videojuego, null, HttpStatus.OK);
        } catch (Exception ex) {
            // TODO estos mensajes no se pueden mostrar
            return new ResponseEntity("No se pudo modificar el videojuego con id: " + videojuego.getId(), null, HttpStatus.NOT_MODIFIED);
        }
    }
}
