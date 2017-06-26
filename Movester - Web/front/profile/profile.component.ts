import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../services/index";
import {User} from "../models/index"


@Component({
    selector: 'profile',
    templateUrl: 'front/profile/profile.component.html'
})
export class ProfileComponent {

    user : User;
    confirm_password : string;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.userService.loadUser(parseInt(localStorage.getItem("currentUser"),10)).then((user) => {
            this.user = user;
            user.password = "***";
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }

    send() {
        //TODO
    }

}