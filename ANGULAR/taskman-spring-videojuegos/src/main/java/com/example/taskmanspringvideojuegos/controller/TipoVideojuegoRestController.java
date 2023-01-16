package com.example.taskmanspringvideojuegos.controller;

import com.example.taskmanspringvideojuegos.model.entity.TipoVideojuego;
import com.example.taskmanspringvideojuegos.model.entity.Usuario;
import com.example.taskmanspringvideojuegos.service.TiposVideojuegosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/tipos-videojuegos")
public class TipoVideojuegoRestController {
    @Autowired
    private TiposVideojuegosService tiposVideojuegosService;

    @GetMapping("")
    public ResponseEntity<List<TipoVideojuego>> list() {
        List tiposVideojuegos = tiposVideojuegosService.listAll();
        return new ResponseEntity<>(tiposVideojuegos, null, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoVideojuego> get(@PathVariable long id) {
        try {
            TipoVideojuego tipoVideojuego = tiposVideojuegosService.get(id);
            return new ResponseEntity(tipoVideojuego, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No existe el tipo con id: " + id, null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Usuario> create(@RequestBody TipoVideojuego tipoVideojuego) {
        try {
            tiposVideojuegosService.save(tipoVideojuego);
            return new ResponseEntity(tipoVideojuego, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No se pudo crear el tipo: " + tipoVideojuego.toString(), null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody TipoVideojuego tipoVideojuego) {
        try {
            tipoVideojuego = tiposVideojuegosService.update(tipoVideojuego);
            return new ResponseEntity(tipoVideojuego, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No se pudo modificar la tipo con id: " + tipoVideojuego.getId(), null, HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        try {
            TipoVideojuego tipoVideojuego = tiposVideojuegosService.get(id);
            tiposVideojuegosService.delete(id);
            return new ResponseEntity(tipoVideojuego, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No se pudo borrar el tipo con id: " + id, null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping("/por-nombre")
    public ResponseEntity<List<TipoVideojuego>> list(@RequestBody HashMap<String, String> args) {

        // Obtiene el filtro
        String filtro = args.get("filtro");

        // Hace la búsqueda
        List tipos = tiposVideojuegosService.searchAllByNombreContaining(filtro);
        return new ResponseEntity<>(tipos, null, HttpStatus.OK);
    }

    @GetMapping("/resumen-tipos")
    public ResponseEntity<Object[]> resumen() {
        Object[] tipos = tiposVideojuegosService.resumenTipoVideojuegos();
        return new ResponseEntity<>(tipos, null, HttpStatus.OK);
    }
}
