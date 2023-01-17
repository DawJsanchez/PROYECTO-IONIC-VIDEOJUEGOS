package com.example.taskmanspringvideojuegos.model.json;


import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;

@NoArgsConstructor @AllArgsConstructor @Setter @Getter @ToString @Slf4j
public class UsuarioLogin implements Serializable {
    private String username;
    private String password;
}


