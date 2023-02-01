import {Usuarios} from "../../users/interfaces/usuarios.interface";

export interface Videojuego {
  id?:                    number;
  titulo:                 string;
  usuarioInformador:      Usuarios;
  usuarioAsignado:        Usuarios;
  //tipoVideojuego:         TipoVideojuego;
  //estadoTipoVideojuego:   EstadoTipoVideojuego;
  descripcion:            string;
  fechaAlta:              Date;
  fechaVencimiento:       null;
  horaVencimiento:        null;
  createdAt?:             Date;
  updatedAt?:             Date;
}
