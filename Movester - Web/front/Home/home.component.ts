import {Component, Input, OnInit} from '@angular/core';
import {HistoryService} from "../services/index";
import {Record} from "../models/index"


@Component({
    selector: 'home',
    templateUrl: 'front/home/home.component.html'
})
export class HomeComponent {

    lastRecord : Record[];

    constructor(private historyService: HistoryService) {
        this.lastRecord = new Array<Record>();
    }

    ngOnInit() {
        this.historyService.loadLast(parseInt(localStorage.getItem("currentUser"),10)).then((record) => {
            this.lastRecord = record;
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }

}