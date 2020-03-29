import { Timestamp } from 'rxjs';

export interface Jugador {
  nombre: string;
  rol: Rol;
  estado: Estado;
  uid: string;
  id: string;
}

export interface Message {
  message: string;
  date: number;
  playerName: string;
}

export interface Voto {
  nominado: string;
  votante: string;
}

export interface Partida {
  dia: number;
  periodo: Periodo;
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
  aldeano = 'aldeano',
}
