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
let HistoryService = class HistoryService {
    constructor(http) {
        this.http = http;
        this.token = localStorage.getItem('token');
    }
    loadAll() {
        let headers = new http_1.Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("/history/all", options).toPromise().then(response => response.json())
            .catch((reason) => {
            console.log('Handle rejected promise (' + reason + ') here.');
        });
    }
    getIndexLast() {
        let headers = new http_1.Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("/history/last", options).toPromise().then(response => response.json().id_record)
            .catch((reason) => {
            console.log('Handle rejected promise (' + reason + ') here.');
        });
    }
    loadDetails(id) {
        let headers = new http_1.Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("/history/details?id_record=" + id, options).toPromise().then(response => response.json())
            .catch((reason) => {
            console.log('Handle rejected promise (' + reason + ') here.');
        });
    }
};
HistoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map