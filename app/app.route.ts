import { Routes } from '@angular/router';
import { LoginComponent } from '~/login/login.component';
import { AppComponent } from '~/app.component';

export const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'culture/discoverevents/login', component: LoginComponent }
];