import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../partida/partida.service';
import { Observable } from 'rxjs';
import { Partida, Jugador, Voto, Rol } from '../types';
import { VotacionAldeanosService } from '../votacion/votacion.service';
import { JugadoresService } from '../jugadores/jugadores.service';

@Component({
  selector: 'app-plaza',
  templateUrl: './plaza.component.html',
  styleUrls: ['./plaza.component.scss']
})
export class PlazaComponent implements OnInit {
  public partida$: Observable<Partida>;
  public jugadores: Jugador[];
  private aldeanos: Jugador[];
  private lobos: Jugador[];
  private hanVotado: string[] = [];
  private hanVotadoLobos: string[] = [];
  public jugador: Jugador;
  public jugadoresJugando: Jugador[];

  constructor(
    private partidaService: PartidaService,
    private votacionAldeanosService: VotacionAldeanosService,
    private jugadoresService: JugadoresService,
    ) { }

  ngOnInit() {
    this.partida$ = this.partidaService.partida$;
    this.jugadoresService.getMiJugador$().subscribe(jugador => {
      this.jugador = jugador;
    });
    this.jugadoresService.getJugadores().subscribe(jugadores => {
      this.jugadores = jugadores;
      this.jugadoresJugando = jugadores.filter(jugador => jugador.estado);
      this.aldeanos = jugadores.filter(jugador => jugador.rol === 'aldeano');
      this.lobos = jugadores.filter(jugador => jugador.rol === 'lobo');
    });

    this.votacionAldeanosService.votosAldeanos$.subscribe(
      votos => {
        const cuentaVotos = {};
        votos.forEach(
          voto => {
            this.hanVotado.push(voto.votante);
            if (cuentaVotos[voto.nominado]) {
              cuentaVotos[voto.nominado] += 1;
            } else {
              cuentaVotos[voto.nominado] = 1;
            }
          }
        );
        if (
          this.partidaService.partidaData.periodo === 'dia' &&
          votos.length === this.jugadores.length
          ) {
            let maxVotos = 0;
            let aMorir = null;
            for (let [id, votos] of Object.entries(cuentaVotos)) {
              if (votos > maxVotos) {
                aMorir = id;
                maxVotos = votos as number;
              }
            }
            this.jugadoresService.kill(aMorir);
            this.hanVotado = [];
            this.votacionAldeanosService.limpiarVotosAldeanos();
            this.partidaService.siguienteTurno();
        }
      }
    );

    this.votacionAldeanosService.votosLobos$.subscribe(
      votos => {
        const cuentaVotos = {};
        votos.forEach(
          voto => {
            this.hanVotadoLobos.push(voto.votante);
            if (cuentaVotos[voto.nominado]) {
              cuentaVotos[voto.nominado] += 1;
            } else {
              cuentaVotos[voto.nominado] = 1;
            }
          }
        );
        if (
          this.partidaService.partidaData.periodo === 'noche' &&
          votos.length === this.lobos.length
          ) {
            let maxVotos = 0;
            let aMorir = null;
            for (let [id, votos] of Object.entries(cuentaVotos)) {
              if (votos > maxVotos) {
                aMorir = id;
                maxVotos = votos as number;
              }
            }
            this.jugadoresService.kill(aMorir);
            this.hanVotadoLobos = [];
            this.votacionAldeanosService.limpiarVotosLobos();
            this.partidaService.siguienteTurno();
        }
      }
    );
  }

  siguienteTurno() {
    this.partidaService.siguienteTurno();
  }

  addVoto(rol: string, nominado: string) {
    const votante = this.jugador.id;
    if ((rol == 'aldeano' && !this.hanVotado.includes(votante)) || (rol == 'lobo' && !this.hanVotadoLobos.includes(votante))) {
      const voto = {votante, nominado};
      if (rol === Rol.aldeano) {
        this.votacionAldeanosService.addVotoAldeano(voto);
      } else {
        this.votacionAldeanosService.addVotoLobo(voto);
      }
    } else {
      alert('Solo puedes votar 1 vez');
    }
  }

}
