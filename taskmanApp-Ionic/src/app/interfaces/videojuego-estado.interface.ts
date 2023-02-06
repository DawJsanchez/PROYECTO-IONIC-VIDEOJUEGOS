export interface EstadoTipoVideojuego {
  id?:         number;
  nombre:      string;
  tipoVideojuego?:  EstadoTipoVideojuego;
  createdAt?:  Date;
  updatedAt?:  Date;
}
