package com.example.taskmanspringvideojuegos.model.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor @AllArgsConstructor @Setter @Getter @ToString @Slf4j
@Entity
@Table(name="usuarios")
public class Usuario implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 16, unique = true, nullable = false)
    private String username;

    //@JsonIgnore
    @Column(length = 60, nullable = false)
    private String password;
    @Column(length = 200, nullable = false)
    private String nombreCompleto;
    @Column(length = 100)
    private String rol;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    @PreUpdate
   // @PreRemove
    private void beforeAnyUpdate() {
        if (id == null) {
            createdAt = new Date();
            updatedAt = createdAt;
        } else
            updatedAt = new Date();
    }

    @PostPersist private void postPersist() { log.info("Creado el usuario: " + username + " con id: " + id); }
    @PostUpdate private void postUpdate() { log.info("Actualizado el usuario: " + username + " con id: " + id); }
    @PostRemove private void postRemove() { log.info("Borrrado el usuario: " + username + " con id: " + id); }


}


