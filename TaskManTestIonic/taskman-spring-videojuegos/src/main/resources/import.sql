# Password 1234 encriptado
insert into usuarios (username, password, nombre_completo, rol, created_at, updated_at) values ('admin',   '$2a$10$xMuafW5yl2MNy6kSjFMimONdlO/rdbGK8MOyxDf3Ysx8QUxdI1ZvO', 'Administrador', 'admin', now(), now());
insert into usuarios (username, password, nombre_completo, rol, created_at, updated_at) values ('usuario', '$2a$10$xMuafW5yl2MNy6kSjFMimONdlO/rdbGK8MOyxDf3Ysx8QUxdI1ZvO', 'Usuario', 'usuario', now(), now());

insert into tipo_videojuegos (nombre, created_at, updated_at) values ('Videojuego', now(), now());
insert into tipo_videojuegos (nombre, created_at, updated_at) values ('Recordatorio', now(), now());

insert into estados_tipo_videojuegos (tipo_videojuego_id, nombre, created_at, updated_at) values (1, 'DVD', now(), now());
insert into estados_tipo_videojuegos (tipo_videojuego_id, nombre, created_at, updated_at) values (1, 'Online', now(), now());

insert into estados_tipo_videojuegos (tipo_videojuego_id, nombre, created_at, updated_at) values (2, 'DVD', now(), now());
insert into estados_tipo_videojuegos (tipo_videojuego_id, nombre, created_at, updated_at) values (2, 'Online', now(), now());

insert into etiquetas (nombre, created_at, updated_at) values ('Nuevo', now(), now());
insert into etiquetas (nombre, created_at, updated_at) values ('Antiguo', now(), now());

INSERT INTO videojuegos (titulo, usuario_informador_id, usuario_asignado_id, tipo_videojuego_id, estado_tipo_videojuego_id, descripcion, fecha_alta, fecha_vencimiento, hora_vencimiento, created_at, updated_at) VALUES('Valorant', 1, 2, 1, 2, 'NUevo videojuego', now(), NULL, NULL, now(), now());


