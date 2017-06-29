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
let HomeComponent = class HomeComponent {
    constructor(historyService) {
        this.historyService = historyService;
        this.lat = 51.678418;
        this.lng = 7.809007;
        this.details = [];
    }
    ngOnInit() {
        this.historyService.getIndexLast().then((id) => {
            this.historyService.loadAll().then((records) => {
                for (let i = 0; i < records.length; i++) {
                    if (records[i].id_record == id)
                        this.lastRecord = records[i];
                }
            });
            this.historyService.loadDetails(id).then((surveys) => {
                this.details = surveys;
                if (surveys.length > 0) {
                    this.lat = surveys[0].latitude_end;
                    this.lng = surveys[0].longitude_end;
                }
            });
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }
};
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'front/home/home.component.html'
    }),
    __metadata("design:paramtypes", [index_1.HistoryService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map