import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../services/index";
import {User} from "../models/index"


@Component({
    selector: 'profile',
    templateUrl: 'front/profile/profile.component.html'
})
export class ProfileComponent {

    userData: User;
    confirm_password: string;
    loading: boolean;
    error: string;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.userService.loadUser(parseInt(localStorage.getItem("currentUser"), 10)).then((user) => {
            this.userData = user;
            this.userData.password = "***";
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }

    send() {
        this.loading = true;
        this.userService.updateProfile(this.userData.login, this.userData.password, this.userData.first_name, this.userData.last_name, this.userData.e_mail, this.confirm_password)
            .subscribe(result => {
                if (result === true) {
                    this.loading = false;
                } else {
                    this.error = 'Zmiana nie powiodła się';
                    this.loading = false;
                }
            });
    }

}