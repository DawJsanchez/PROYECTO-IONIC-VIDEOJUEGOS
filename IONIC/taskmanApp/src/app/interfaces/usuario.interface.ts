export interface TaskmanLoginResponse {
    ok:      number;
    mensaje: string;
    datos:   Usuario;
}

export interface Usuario {
    id_usuario:         number;
    usuario:            string;
    nombre_completo:    number;
    rol:                string;
}
