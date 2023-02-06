----------------------------------------------------------------
-- Crea la base de datos
----------------------------------------------------------------
create database taskman_spring;

----------------------------------------------------------------
-- Crea la tabla de usuarios
--
-- En esta tabla se incluye además el rol del usuario. El rol
-- actualmente es una constante.
----------------------------------------------------------------
create table usuarios (

    id_usuario      int not null auto_increment,
    usuario         varchar(16) not null,
    password        varchar(32) not null,
    nombre_completo varchar(200),

    rol             varchar(100) default 'usuario',

    primary key (id_usuario),
    constraint usuarios_uq_usuario unique (usuario)
);

insert into usuarios (usuario, password, nombre_completo, rol) values ('admin',   '1234', 'Administrador', 'admin');
insert into usuarios (usuario, password, nombre_completo, rol) values ('usuario', '1234', 'Usuario', 'usuario');


----------------------------------------------------------------
-- Crea la tabla de tipos de tareas
--
-- En esta tabla se encuentran los tipos de tareas que se van
-- a implementar en la aplicación 
----------------------------------------------------------------
create table tipos_videojuego (
    id_tipo_videojuego   int not null auto_increment,
    nombre               varchar(100) not null,

    primary key (id_tipo_videojuego)
);

insert into tipos_videojuego (id_tipo_videojuego, nombre) values (1, 'Tarea');
insert into tipos_videojuego (id_tipo_videojuego, nombre) values (2, 'Recordatorio');

----------------------------------------------------------------
-- Crea la tabla de estados
--
-- Para cada tipo de tarea podemos tener una lista diferente de
-- estados. Estos estados serán los estados en que se puede
-- poner una tarea.
----------------------------------------------------------------
create table estados_tipo_videojuegos (
    id_tipo_videojuego        int not null,
    id_estado            int not null auto_increment,
    
    nombre               varchar(100) not null,

    primary key (id_estado),
    foreign key (id_tipo_videojuego) references tipos_tarea(id_tipo_videojuego) on delete cascade
);

insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (1, 1, "DVD");
insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (1, 2, "Omline");

insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (2, 3, "DVD");
insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (2, 4, "Online");

----------------------------------------------------------------
-- Etiquetas
--
-- Esta es la tabla de etiquetas. Las etiquetas permiten
-- clasificar las tareas
----------------------------------------------------------------
create table etiquetas (
    id_etiqueta        int not null auto_increment,
    nombre             varchar(50) not null,

    primary key(id_etiqueta),
    constraint unique(nombre)
);

insert into etiquetas (id_etiqueta, nombre) values (1, "Nuevo");
insert into etiquetas (id_etiqueta, nombre) values (2, "Antiguo");

----------------------------------------------------------------
-- Crea la tabla de tareas
--
-- Al ser una aplicación de gestión de tareas, la tabla de 
-- tareas va a ser el núcleo de las tablas de la aplicación.
----------------------------------------------------------------
create table videojuegos (

    id_videojuego           int not null auto_increment,
    titulo                  varchar(100) not null,

    usuarioInformador       int not null, -- ID del usuario que registra la
                                  -- incidencia
    usuarioAsignado         int not null, -- Persona asignada a la incidencia
                                  -- por defecto será el informador

    tipoVideojuego          int not null, -- Es el tipo de tareas.
                                  -- los tipos de incidencia se descargan
                                  -- desde la tabla de tipos de tareas.
    
    estadoTipoVideojuego    int not null, -- Estado en que se encuentra la tarea

    etiquetas               int not null,
                                  
    descripcion             varchar(4000),-- descripción de la tarea

    fecha_alta              timestamp default now(),
        
    fechaVencimiento date,     -- Fecha de vencimiento de la tarea

    horaVencimiento time,      -- Hora de vencimiento de la tarea

    primary key (id_videojuego)
);

INSERT INTO videojuegos
(titulo, usuarioInformador, usuarioAsignado, tipoVideojuego, estadoTipoVideojuego, etiquetas, descripcion, fecha_alta, fecha_vencimiento, hora_vencimiento)
VALUES('Ejemplo de videojuego', 1, 2, 1, 2, 'current_timestamp()', current_timestamp(), NULL, NULL);


----------------------------------------------------------------
-- Etiquetas
--
-- Cada tarea puede tener asociados un determinado númnero
-- de etiquetas.
----------------------------------------------------------------
create table etiquetas_videojuego (
    id_videojuego   int not null,
    id_etiqueta     int not null, 

    primary key(id_videojuego, id_etiqueta),

    constraint fk_etiquetas_videojuego_id_etiqueta foreign key (id_etiqueta) references etiquetas(id_etiqueta) on delete cascade,
    constraint fk_etiquetas_videojuego_id_videojuego foreign key (id_videojuego) references tareas(id_videojuego) on delete cascade
);


----------------------------------------------------------------
-- Comentarios
--
-- Comentarios asociados a la tarea. Cada comentario
-- está asociado a una tarea y un usuario.
----------------------------------------------------------------
create table comentarios (
    id_tarea        int not null,
    id_comentario   int not null auto_increment,

    fecha_alta      timestamp default now(), 
    texto           varchar(1000) not null,

    primary key (id_comentario),
    constraint fk_comentarios_id_tarea foreign key (id_tarea) references tareas(id_tarea) on delete cascade
);

