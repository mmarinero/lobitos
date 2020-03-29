import { Timestamp } from 'rxjs';

export interface Jugador {
  nombre: string;
  rol: Rol;
  estado: Estado;
  id: string;
}

export interface Message {
  message: string;
  timestamp: any;
  playerId: string;
  chatRoomId: string;
  messageId: string;
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
