export interface Jugador {
  nombre: string;
  rol: Rol;
  estado: Estado;
  id: string;
}

export interface Voto {
  nominado: Jugador,
  votante: Jugador
}

export interface Partida {
  dia: number,
  periodo: Periodo
}

export enum Periodo {
  dia = 'dia',
  noche = 'noche',
}

export enum Estado {
  vivo = 1,
  muerto = 0,
}

export enum Rol {
  lobo = 'lobo',
  aldeano = 'aledano',
}
