import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthGuard } from './auth.guard';
import {AuthenticationService} from "./services/index";
import {UserService} from "./services/index";

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
    host: { '(document:click)': 'onClick($event)' }
})

export class AppComponent {

    searchText = '';

    constructor(private authenticationService: AuthenticationService,
                private userService: UserService,
                private router : Router) {
    }

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

    getStyle(url:string) : string {
        if(url === this.router.url)
            return "menu-selected";
        else
            return "menu";
    }

    search() {
        this.userService.searchUser(this.searchText).then((id) => {
            this.router.navigate(['/view'],{ queryParams: { id: id } });
            console.log("wahat");
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }

    showDropdown(id:string) {
        document.getElementById(id).classList.toggle("show");
    }

    onClick(event:any) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
}