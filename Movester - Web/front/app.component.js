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
const index_1 = require("./services/index");
const index_2 = require("./services/index");
let AppComponent = class AppComponent {
    constructor(authenticationService, userService, router) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.router = router;
        this.searchText = '';
    }
    get isLogged() {
        if (localStorage.getItem('currentUser') && localStorage.getItem('token'))
            return true;
        else
            return false;
    }
    logOut() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    getStyle(url) {
        if (url === this.router.url)
            return "menu-selected";
        else
            return "menu";
    }
    search() {
        this.userService.searchUser(this.searchText).then((id) => {
            this.router.navigate(['/view'], { queryParams: { id: id } });
            console.log("wahat");
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }
    showDropdown(id) {
        document.getElementById(id).classList.toggle("show");
    }
    onClick(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
};
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app',
        templateUrl: 'app.component.html',
        host: { '(document:click)': 'onClick($event)' }
    }),
    __metadata("design:paramtypes", [index_1.AuthenticationService,
        index_2.UserService,
        router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map