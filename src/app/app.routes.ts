import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VideoflixComponent } from './components/videoflix/videoflix.component';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'videoflix', component: VideoflixComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'accountDetails', component: AccountdetailsComponent },
    { path: '**', redirectTo: 'login' }  // Wildcard-Route für unbekannte URLs
];
