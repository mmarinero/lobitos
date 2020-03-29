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

  constructor(
    private partidaService: PartidaService,
    private votacionAldeanosService: VotacionAldeanosService,
    private jugadoresService: JugadoresService,
    ) { }

  ngOnInit() {
    this.partida$ = this.partidaService.partida$;

    this.jugadoresService.getJugadores().subscribe(jugadores => {
      this.jugadores = jugadores;
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
            console.log('todos votan');
            console.log(cuentaVotos);
          // Todos los aldeanos han votado
          // FIXME: Ver quien tiene más votos, matarle, borar los votos y pasar de turno
          // this.jugadoresService.kill(id);
          // this.votacionAldeanosService.limpiarVotosAldeanos();
          // this.partidaService.siguienteTurno();
        }
      }
    );
  }

  siguienteTurno() {
    this.partidaService.siguienteTurno();
  }

  addVoto(rol: string, nominado: string) {
    // FIXME: Añadir ids de votante correcta
    const votante = 'XXX1';
    if (!this.hanVotado.includes(votante)) {
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
