import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/index";
import {User} from "../models/index"


@Component({
    templateUrl: 'front/register/register.component.html'
})
export class RegisterComponent {

    userData : User;
    confirmPassword: string;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        //reset login status
        this.authenticationService.logout();
    }

    register() {

    }

}