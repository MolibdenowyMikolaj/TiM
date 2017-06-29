import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../services/index";
import {User} from "../models/index"
import {query} from "@angular/animations";


@Component({
    moduleId: module.id,
    templateUrl: 'view.component.html'
})
export class ViewComponent {

    person : User;
    id : number;
    isFriend: boolean;
    buttonText: String;
    loading: boolean;

    constructor(private userService: UserService, private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.loading = true;
        this.isFriend = false;
        this.route
            .queryParams
            .subscribe(params => {
                this.id = params['id'];
                this.load();
            });
    }

    load() {
        if(this.id) {
            this.userService.loadUser(this.id).then((user) => {
                this.person = user;
                this.loading = false;
            }, function (err) {
                console.log(err); // Error: "It broke"
            });

            this.userService.loadFriends().then((friends) => {

                for(let i = 0; i < friends.length; i++)
                    if(friends[i].id_user == this.id)
                        this.isFriend = true;

                if(!this.isFriend){
                    this.buttonText = "Dodaj znajomego";
                } else {
                    this.buttonText = "Usuń znajomego";
                }
            });
        }
    }

    isSelf():boolean{
        if(this.id == parseInt(localStorage.getItem("currentUser"), 10))
            return true;
        else
            return false;
    }

    toggleFriend() {
        if(this.isFriend){
            this.userService.removeFriend(this.id);
            this.isFriend = false;
            this.buttonText = "Dodaj znajomego";
        } else {
            this.userService.addFriend(this.id);
            this.isFriend = true;
            this.buttonText = "Usuń znajomego";
        }
    }
}