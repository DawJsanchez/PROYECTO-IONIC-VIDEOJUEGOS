export interface TaskmanListaTareasResponse {
    ok:      number;
    mensaje: string;
    datos:   Tarea[];
}

export interface TaskmanTareaResponse {
    ok:      number;
    mensaje: string;
    datos:   Tarea;
}

export interface TaskmanConsultaTareas {
    ok:      number;
    mensaje: string;
    datos:   any[];
}
export interface Tarea {
    id_tarea?:         number;
    titulo:            string;
    id_informador:     number;
    informador?:       string;
    id_asignado:       number;
    asignado?:         string;
    id_tipo_tarea:     number;
    tipo?:             string;
    id_estado:         number;
    estado?:           string;
    descripcion:       string;
    fecha_alta:        string;
    fecha_vencimiento: string;
    hora_vencimiento:  string;
}

