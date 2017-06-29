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
const http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.token = localStorage.getItem('token');
    }
    updateProfile(username, password, firstName, lastName, email, confirmationPassword) {
        return this.http.post('/user/update', { login: username, password: password, first_name: firstName, last_name: lastName, e_mail: email, confirmation_password: confirmationPassword })
            .map((response) => {
            // check resonse
            let res = response.json() && response.json().status;
            if (res === 'OK') {
                // return true to indicate successful register
                return true;
            }
            else {
                // return false to indicate failed register
                return false;
            }
        });
    }
    loadUser(id) {
        let headers = new http_1.Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("/user/data?id=" + id, options).toPromise().then(response => response.json()[0])
            .catch((reason) => {
            console.log('Handle rejected promise (' + reason + ') here.');
        });
    }
    loadFriends() {
        let headers = new http_1.Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("/user/friends", options).toPromise().then(response => response.json())
            .catch((reason) => {
            console.log('Handle rejected promise (' + reason + ') here.');
        });
    }
    searchUser(val) {
        let headers = new http_1.Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("/user/search?val=" + val, options).toPromise().then(response => response.json().id_user)
            .catch((reason) => {
            console.log('Handle rejected promise (' + reason + ') here.');
        });
    }
    addFriend(userId) {
        let headers = new http_1.Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new http_1.RequestOptions({ headers: headers });
        this.http.post('/user/friend', { id_user: userId }, options).subscribe();
    }
    removeFriend(userId) {
        let headers = new http_1.Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new http_1.RequestOptions({ headers: headers });
        this.http.post('/user/unfriend', { id_user: userId }, options).subscribe();
    }
};
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map