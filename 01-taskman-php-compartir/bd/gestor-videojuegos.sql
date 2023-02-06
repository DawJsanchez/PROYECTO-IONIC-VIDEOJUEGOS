----------------------------------------------------------------
-- Crea la base de datos
----------------------------------------------------------------
drop DATABASE if EXISTS taskman_spring;
create database taskman_spring;
use taskman_spring;
----------------------------------------------------------------
-- Crea la tabla de usuarios
-- En esta tabla se incluye además el rol del usuario.
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
-- Crea la tabla de tipos de videojuegos
-- Tipos de juegos
----------------------------------------------------------------
create table tipo_videojuegos (
    id_tipo_videojuego   int not null auto_increment,
    nombre               varchar(100) not null,

    primary key (id_tipo_videojuego)
);

insert into tipo_videojuegos (id_tipo_videojuego, nombre) values (1, 'Deportes');
insert into tipo_videojuegos (id_tipo_videojuego, nombre) values (2, 'Aventura');
insert into tipo_videojuegos (id_tipo_videojuego, nombre) values (3, 'Shooter');

----------------------------------------------------------------
-- Crea la tabla de estados
--
-- Para cada tipo de tarea podemos tener una lista diferente de
-- estados. Estos estados serán los estados en que se puede
-- poner una tarea.
----------------------------------------------------------------
create table estados_tipo_videojuegos (
    id_tipo_videojuego        int not null,
    id_estado                 int not null auto_increment,
    nombre                    varchar(100) not null,

    primary key (id_estado),
    foreign key (id_tipo_videojuego) references tipo_videojuegos(id_tipo_videojuego) on delete cascade
);

insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (1, 1, "Disponible");
insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (1, 2, "Sin stock");
insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (1, 3, "Reserva");

insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (2, 4, "Disponible");
insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (2, 5, "Sin stock");
insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (2, 6, "Reserva");

insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (3, 7, "Disponible");
insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (3, 8, "Sin stock");
insert into estados_tipo_videojuegos (id_tipo_videojuego, id_estado, nombre) values (3, 9, "Reserva");

----------------------------------------------------------------
-- Etiquetas
-- Esta es la tabla de etiquetas.
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
-- Crea la tabla de videojuegos
-- Al ser una aplicación de gestión de juegos, la tabla de
-- videojuegos va a ser el núcleo de las tablas de la aplicación.
----------------------------------------------------------------
create table videojuegos (

    id_videojuego           int not null auto_increment,
    titulo                  varchar(100) not null,
    id_informador           int not null,       -- ID del usuario que registra la incidencia
    id_asignado             int not null,       -- Persona asignada a la incidencia
    tipo_videojuego         int not null,       -- Es el tipo de juego.
    estado                  int not null,       -- Estado en que se encuentra la tarea
    descripcion             varchar(4000),      -- descripción del juego
    fecha_alta              timestamp default now(),
    fecha_vencimiento       date,               -- Fecha de vencimiento de la tarea
    hora_vencimiento        time,               -- Hora de vencimiento de la tarea

    primary key (id_videojuego)
);

INSERT INTO videojuegos
(titulo, id_informador, id_asignado, tipo_videojuego, estado, descripcion, fecha_alta, fecha_vencimiento, hora_vencimiento)
VALUES('Ejemplo de videojuego', 1, 2, 2, 1, null,'current_timestamp()', NULL, NULL);

----------------------------------------------------------------
-- Etiquetas
-- Cada juego puede tener asociados un determinado número
-- de etiquetas.
----------------------------------------------------------------
create table etiquetas_videojuego (
    id_videojuego   int not null,
    id_etiqueta     int not null, 

    primary key(id_videojuego, id_etiqueta),

    constraint fk_etiquetas_videojuego_id_etiqueta foreign key (id_etiqueta) references etiquetas(id_etiqueta) on delete cascade,
    constraint fk_etiquetas_videojuego_id_videojuego foreign key (id_videojuego) references videojuegos(id_videojuego) on delete cascade
);


----------------------------------------------------------------
-- Comentarios
-- Comentarios asociados al juego. Cada comentario se asocia a un juego
----------------------------------------------------------------
create table comentarios (
    id_videojuego        int not null,
    id_comentario   int not null auto_increment,

    fecha_alta      timestamp default now(), 
    texto           varchar(1000) not null,

    primary key (id_comentario),
    constraint fk_comentarios_id_videojuego foreign key (id_videojuego) references videojuegos(id_videojuego) on delete cascade
);

