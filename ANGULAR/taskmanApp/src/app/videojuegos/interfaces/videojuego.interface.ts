import { Usuario } from "src/app/auth/interfaces/usuarios.interfaces";
import { TipoVideojuego } from "src/app/videojuegos-tipo/interfaces/videojuego-tipo.interface";
import { EstadoTipoVideojuego } from "src/app/videojuegos-estado/interfaces/task-type-state.interface";

export interface ResumenVideojuegos {
    resumen: Resumen [];
}

export interface Resumen {
    contador:   number; // Número de videojuegos
    estado:     string; // Contador
}

export interface Videojuego {
    id?:                    number;
    titulo:                 string;
    usuarioInformador:      Usuario;
    usuarioAsignado:        Usuario;
    tipoVideojuego:         TipoVideojuego;
    estadoTipoVideojuego:   EstadoTipoVideojuego;
    descripcion:            string;
    fechaAlta:              Date;
    fechaVencimiento:       null;
    horaVencimiento:        null;
    createdAt?:             Date;
    updatedAt?:             Date;
}
