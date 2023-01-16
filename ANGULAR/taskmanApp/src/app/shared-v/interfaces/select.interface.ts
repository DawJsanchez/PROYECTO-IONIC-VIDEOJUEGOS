export interface TaskmanSelectResponse {
    ok:      number;
    mensaje: string;
    datos:   EntradaSelect[];
}

export interface EntradaSelect {
    id:    number;
    texto: string;
}
