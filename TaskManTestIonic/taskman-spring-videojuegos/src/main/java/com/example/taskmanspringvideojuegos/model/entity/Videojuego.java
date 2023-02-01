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
@Table(name="videojuegos")
public class Videojuego implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, nullable = false)
    private String titulo;

    // Las comento porque esto se pone en caso de referencias circulares junto con JsonBackReference
    // para gestionarlas. Solo las dejo en las referencias que son circulares.
    //@JsonManagedReference
    @ManyToOne
    @JoinColumn(name="usuario_informador_id",nullable = false)
    private Usuario usuarioInformador;

    //@JsonManagedReference
    @ManyToOne
    @JoinColumn(name="usuario_asignado_id",nullable = false)
    private Usuario usuarioAsignado;

    //@JsonManagedReference(value="tipoTarea")
    @ManyToOne
    @JoinColumn(nullable = false)
    private TipoVideojuego tipoVideojuego;

    //@JsonManagedReference(value="estadoTipoTarea")
    @ManyToOne
    @JoinColumn(nullable = false)
    private EstadoTipoVideojuego estadoTipoVideojuego;
    @JsonBackReference
    @ManyToMany(mappedBy = "videojuegos")
    List<Etiqueta> etiquetas;
    @Lob
    private String descripcion;
    @Temporal(TemporalType.DATE)
    private Date fechaAlta;
    @Temporal(TemporalType.DATE)
    private Date fechaVencimiento;
    @Temporal(TemporalType.TIME)
    private Date horaVencimiento;

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


