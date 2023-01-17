package com.example.taskmanspringvideojuegos.controller;

import com.example.taskmanspringvideojuegos.model.entity.Usuario;
import com.example.taskmanspringvideojuegos.model.entity.Videojuego;
import com.example.taskmanspringvideojuegos.service.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/usuarios")
public class UsuariosRestController {
    @Autowired
    private UsuariosService usuariosService;

    @GetMapping("")
    public ResponseEntity<List<Usuario>> list() {
        List usuarios = usuariosService.listAll();
        return new ResponseEntity<>(usuarios, null, HttpStatus.OK);
    }

    @PostMapping("/por-username")
    public ResponseEntity<List<Usuario>> list(@RequestBody HashMap<String, String> args) {

        // Obtiene el filtro
        String filtro = args.get("filtro");

        // Hace la búsqueda
        List usuarios = usuariosService.searchAllByUsernameContaining(filtro);
        return new ResponseEntity<>(usuarios, null, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> get(@PathVariable long id) {
        try {
            Usuario usuario = usuariosService.get(id);
            return new ResponseEntity(usuario, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No existe el usuario con id: " + id, null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        try {
            usuariosService.save(usuario);
            return new ResponseEntity(usuario, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No se pudo crear el usuario: " + usuario.toString(), null, HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        try {
            Usuario usuario = usuariosService.get(id);
            usuariosService.delete(id);
            return new ResponseEntity(usuario, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No se pudo borrar el usuario con id: " + id, null, HttpStatus.NOT_MODIFIED);
        }
    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody Usuario usuario) {
        try {
            usuario = usuariosService.update(usuario);
            return new ResponseEntity(usuario, null, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity("No se pudo modificar el usuario con id: " + usuario.getId(), null, HttpStatus.NOT_MODIFIED);
        }
    }

    @GetMapping("/resumen-usuarios")
    public ResponseEntity<Object[]> resumen() {
        Object[] usuarios = usuariosService.resumenRolUsuarios();
        return new ResponseEntity<>(usuarios, null, HttpStatus.OK);
    }
}
