import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../services/index";
import {User} from "../models/index"
import {Router} from "@angular/router";


@Component({
    selector: 'social',
    templateUrl: 'front/social/social.component.html'
})
export class SocialComponent {

    friends : User[];

    constructor(private userService: UserService, private router:Router) {
        this.friends = [];
        this.load();
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.userService.loadFriends().then((friends) => {
            this.friends = friends;
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }

}