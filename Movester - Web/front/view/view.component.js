"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const index_1 = require("../services/index");
let ViewComponent = class ViewComponent {
    constructor(userService, route) {
        this.userService = userService;
        this.route = route;
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
        if (this.id) {
            this.userService.loadUser(this.id).then((user) => {
                this.person = user;
                this.loading = false;
            }, function (err) {
                console.log(err); // Error: "It broke"
            });
            this.userService.loadFriends().then((friends) => {
                for (let i = 0; i < friends.length; i++)
                    if (friends[i].id_user == this.id)
                        this.isFriend = true;
                if (!this.isFriend) {
                    this.buttonText = "Dodaj znajomego";
                }
                else {
                    this.buttonText = "Usuń znajomego";
                }
            });
        }
    }
    isSelf() {
        if (this.id == parseInt(localStorage.getItem("currentUser"), 10))
            return true;
        else
            return false;
    }
    toggleFriend() {
        if (this.isFriend) {
            this.userService.removeFriend(this.id);
            this.isFriend = false;
            this.buttonText = "Dodaj znajomego";
        }
        else {
            this.userService.addFriend(this.id);
            this.isFriend = true;
            this.buttonText = "Usuń znajomego";
        }
    }
};
ViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'view.component.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService, router_1.ActivatedRoute])
], ViewComponent);
exports.ViewComponent = ViewComponent;
//# sourceMappingURL=view.component.js.map