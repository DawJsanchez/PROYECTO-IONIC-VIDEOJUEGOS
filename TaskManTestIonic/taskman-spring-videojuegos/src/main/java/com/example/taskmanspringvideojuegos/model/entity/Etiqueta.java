package com.example.taskmanspringvideojuegos.model.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@NoArgsConstructor @AllArgsConstructor @Setter @Getter @ToString @Slf4j
@Entity
@Table(name="etiquetas")
public class Etiqueta implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50, unique = true, nullable = false)
    private String nombre;
    @JsonBackReference
    @ManyToMany
    @JoinTable(
            name = "etiquetas-videojuegos",
            joinColumns = @JoinColumn(name = "etiqueta_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="videojuego_id", nullable = false)
    )
    private List<Videojuego> videojuegos;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    @PreUpdate
    private void beforeAnyUpdate() {
        if (id == null) {
            createdAt = new Date();
            updatedAt = createdAt;
        } else
            updatedAt = new Date();
    }

    @PostPersist private void postPersist() { log.info("Creado "+this.getClass().getName()+": " + " con id: " + id); }
    @PostUpdate private void postUpdate() { log.info("Actualizado "+this.getClass().getName()+": " + " con id: " + id); }
    @PostRemove private void postRemove() { log.info("Borrado "+this.getClass().getName()+": " + " con id: " + id); }


}


