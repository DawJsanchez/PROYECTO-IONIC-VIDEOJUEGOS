package com.example.taskmanspringvideojuegos.controller;


import com.example.taskmanspringvideojuegos.model.entity.EstadoTipoVideojuego;
import com.example.taskmanspringvideojuegos.service.EstadosTipoVideojuegosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/estados-tipo-videojuegos")
public class EstadosTipoVideojuegosRestController {

    @Autowired
    private EstadosTipoVideojuegosService estadosTipoVideojuegosService;

    @GetMapping("")
    public ResponseEntity<List<EstadoTipoVideojuego>> list() {
        List estadoTipoVideojuego = estadosTipoVideojuegosService.listAll();
        return new ResponseEntity<>(estadoTipoVideojuego, null, HttpStatus.OK);
    }

    @PostMapping("/por-tipo-videojuego")
    public ResponseEntity<List<EstadoTipoVideojuego>> list(@RequestBody HashMap<String, String> args) {

        // Obtiene el filtro
        long idTipoVideojuego = Long.parseLong(args.get("filtro"));

        // Hace la búsqueda
        List estadoTipoVideojuegos = estadosTipoVideojuegosService.listByTipoVideojuego(idTipoVideojuego);
        return new ResponseEntity<>(estadoTipoVideojuegos, null, HttpStatus.OK);
    }


}
