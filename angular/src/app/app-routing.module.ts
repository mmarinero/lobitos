import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RegistrationComponent } from './pages/registration/registration.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { LoginComponent } from './pages/login/login.component';
import { PartidaComponent } from './partida/partida.component';


const routes: Routes = [
  { path: '', redirectTo: 'partida', pathMatch: 'full', canActivate: [AuthGuardService]},
  { path: 'register', component: RegistrationComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'partida', component: PartidaComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
