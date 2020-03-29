import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
    ) {
      console.error(this.authService.user)
    }

  goToLogin() {
    this.router.navigate(['login']);
  }

  logOut() {
    this.authService.SignOut();
  }
}
