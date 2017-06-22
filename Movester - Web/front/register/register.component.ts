import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/index";
import {User} from "../models/index"


@Component({
    templateUrl: 'front/register/register.component.html'
})
export class RegisterComponent {

    loading: boolean;
    complete: boolean;
    error = '';
    userData : User;
    confirmPassword: string;

    constructor(private authenticationService: AuthenticationService, private router:Router) {
    }

    ngOnInit() {
        //reset login status
        this.userData = new User();
        this.authenticationService.logout();
    }

    register() {
        this.loading = true;
        if(this.userData.password == this.confirmPassword) {
            this.authenticationService.register(this.userData.login, this.userData.password, this.userData.first_name, this.userData.last_name, this.userData.e_mail)
                .subscribe(result => {
                    if (result === true) {
                        // route back to login page
                        setTimeout(() => {
                            this.router.navigate(['/login']);
                        }, 2000);
                        this.complete = true;
                        this.loading = false;
                    } else {
                        this.error = 'Rejestracja nie powiodła się';
                        this.loading = false;
                    }
                });
        } else {
            this.error = 'Hasła nie zgadzają się';
            this.loading = false;
        }
    }

}