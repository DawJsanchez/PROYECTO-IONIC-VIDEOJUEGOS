package com.example.taskmanspringvideojuegos.controller;


import com.example.taskmanspringvideojuegos.model.entity.Usuario;
import com.example.taskmanspringvideojuegos.model.json.UsuarioLogin;
import com.example.taskmanspringvideojuegos.service.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class LoginRestController {
    @Autowired
    private UsuariosService usuariosService;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody UsuarioLogin usuarioLogin) {
         Usuario usuario = usuariosService.listByUsernameAnPassword(usuarioLogin.getUsername(),usuarioLogin.getPassword());
         if (usuario!=null) {
            return new ResponseEntity(usuario, null, HttpStatus.OK);
        } else {
            return new ResponseEntity("Las credenciales no son correctas.", null, HttpStatus.FORBIDDEN);
        }
    }


}
