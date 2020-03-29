import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
