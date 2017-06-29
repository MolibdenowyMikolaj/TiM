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
const index_1 = require("../services/index");
let ProfileComponent = class ProfileComponent {
    constructor(userService) {
        this.userService = userService;
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
            }
            else {
                this.error = 'Zmiana nie powiodła się';
                this.loading = false;
            }
        });
    }
};
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: 'front/profile/profile.component.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map