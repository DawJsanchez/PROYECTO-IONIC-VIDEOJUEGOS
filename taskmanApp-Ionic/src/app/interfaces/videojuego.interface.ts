export interface TaskmanListaVideojuegosResponse {
    ok:      number;
    mensaje: string;
    datos:   Videojuego[];
}

export interface TaskmanVideojuegoResponse {
    ok:      number;
    mensaje: string;
    datos:   Videojuego;
}

export interface TaskmanConsultaVideojuegos {
    ok:      number;
    mensaje: string;
    datos:   any[];
}
export interface Videojuego {
    id_videojuego?:    number;
    id?:               number;
    titulo:            string;
    id_informador:     number;
    informador?:       string;
    id_asignado:       number;
    asignado?:         string;
    id_tipo_videojuego:number;
    tipo?:             string;
    id_estado:         number;
    estado?:           string;
    descripcion:       string;
    fecha_alta:        string;
    fecha_vencimiento: string;
    hora_vencimiento:  string;
}

