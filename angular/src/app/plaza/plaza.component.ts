import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../partida/partida.service';
import { Observable } from 'rxjs';
import { Partida } from '../types';

@Component({
  selector: 'app-plaza',
  templateUrl: './plaza.component.html',
  styleUrls: ['./plaza.component.scss']
})
export class PlazaComponent implements OnInit {
  partida$: Observable<Partida>;

  constructor(private partidaService: PartidaService) { }

  ngOnInit() {
    this.partida$ = this.partidaService.partida$;
  }

  siguienteTurno() {
    this.partidaService.siguienteTurno();
  }

}
