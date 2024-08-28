import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VideoflixComponent } from './components/videoflix/videoflix.component';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { ResetPasswordComponentComponent } from './components/reset-password-component/reset-password-component.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'videoflix', component: VideoflixComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'accountDetails', component: AccountdetailsComponent },
    { path: 'privacy-policy', component: PrivacyComponent },
    { path: 'new-password', component: NewPasswordComponent },
    { path: 'reset-password/:uid/:token', component: ResetPasswordComponentComponent },
    { path: '**', redirectTo: 'login' }  // Wildcard-Route für unbekannte URLs
];
