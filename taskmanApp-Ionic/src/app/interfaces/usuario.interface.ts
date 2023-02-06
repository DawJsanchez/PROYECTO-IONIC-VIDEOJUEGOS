export interface TaskmanListaUsuariosResponse {
  ok:      number;
  mensaje: string;
  datos:   Usuario[];
}

export interface TaskmanUsuarioResponse {
  ok:      number;
  mensaje: string;
  datos:   Usuario;
}

export interface TaskmanConsultaUsuarios {
  ok:      number;
  mensaje: string;
  datos:   any[];
}

export interface TaskmanLoginResponse {
    ok:      number;
    mensaje: string;
    datos:   Usuario;
}

export interface Usuario {
  id_usuario?:     number;
  id?:             number;
  usuario:         string;
  password:        string;
  nombre_completo: string;
  rol:             string;
}
