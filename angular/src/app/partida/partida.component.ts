import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { PartidaService } from './partida.service';

@Component({
  selector: 'app-root',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss']
})
export class PartidaComponent {

  title = 'Lobitos Game';
  user = this.authService.user;

  constructor(
    private authService: AuthService,
    private partidaService: PartidaService,
    private router: Router
    ) {
      console.error(this.authService.user);
    }

    ngOnInit() {
      this.authService.user.subscribe(user => {
        this.partidaService.setUser(user);
      });
    }

  goToLogin() {
    this.router.navigate(['login']);
  }

  logOut() {
    this.authService.SignOut();
  }
}
