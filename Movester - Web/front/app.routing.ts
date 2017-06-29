import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { SocialComponent } from './social/index';
import { StatisticsComponent } from './statistics/index';
import { ProfileComponent } from './profile/index';
import { AuthGuard } from './auth.guard';
import {ViewComponent} from "./view/index";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'social', component: SocialComponent, canActivate: [AuthGuard] },
    { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'view', component: ViewComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);