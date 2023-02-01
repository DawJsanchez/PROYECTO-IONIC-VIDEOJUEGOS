export interface Usuario {
  id?:             number;
  username:        string;
  nombreCompleto?: string;
  rol:             string;
  createdAt?:      Date;
  updatedAt?:      Date;
}
