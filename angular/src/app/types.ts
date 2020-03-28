export interface Jugador {
  nombre: string;
  rol: Rol;
  estado: Estado;
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
  vivo = 'vivo',
  muerto = 'muerto',
}

export enum Rol {
  lobo = 'lobo',
  aldeano = 'aledano',
}
