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
const index_2 = require("../models/index");
let RegisterComponent = class RegisterComponent {
    constructor(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.error = '';
    }
    ngOnInit() {
        //reset login status
        this.userData = new index_2.User();
        this.authenticationService.logout();
    }
    register() {
        this.loading = true;
        if (this.userData.password == this.confirmPassword) {
            this.authenticationService.register(this.userData.login, this.userData.password, this.userData.first_name, this.userData.last_name, this.userData.e_mail)
                .subscribe(result => {
                if (result === true) {
                    // route back to login page
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 2000);
                    this.complete = true;
                    this.loading = false;
                }
                else {
                    this.error = 'Rejestracja nie powiodła się';
                    this.loading = false;
                }
            });
        }
        else {
            this.error = 'Hasła nie zgadzają się';
            this.loading = false;
        }
    }
};
RegisterComponent = __decorate([
    core_1.Component({
        templateUrl: 'front/register/register.component.html'
    }),
    __metadata("design:paramtypes", [index_1.AuthenticationService, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map