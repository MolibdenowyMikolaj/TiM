import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../services/index";
import {User} from "../models/index"


@Component({
    selector: 'social',
    templateUrl: 'front/social/social.component.html'
})
export class SocialComponent {

    friends : User[];

    constructor(private userService: UserService) {
        this.friends = new Array<User>();
        this.load();
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.userService.loadFriends(parseInt(localStorage.getItem("currentUser"),10)).then((friends) => {
            this.friends = friends;
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }

}