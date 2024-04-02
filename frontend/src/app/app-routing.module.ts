import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationFormComponent } from './pages/reservation-form/reservation-form.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReservedTableDateComponent } from './pages/reserved-table-date/reserved-table-date.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { ResComponent } from './pages/res/res.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/ReservationFormComponent' },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reserved-table-date',
    component: ReservedTableDateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reservation-form', component: ReservationFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'res', component: ResComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
