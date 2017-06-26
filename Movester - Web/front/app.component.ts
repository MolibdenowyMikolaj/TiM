import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthGuard } from './auth.guard';
import {AuthenticationService} from "./services/index";

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    constructor(private authenticationService: AuthenticationService, private router : Router) {}

    get isLogged() {
        if(localStorage.getItem('currentUser') && localStorage.getItem('token'))
        return true;
    else
        return false;
    }

    logOut() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}