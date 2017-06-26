import {Component, Input, OnInit} from '@angular/core';
import {Record} from '../models/index';
import {Http} from '@angular/http';
import {HistoryService} from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'statistics.component.html'
})
export class StatisticsComponent {
    //atributes
    historia: Record[];

    constructor(private historyService: HistoryService) {
        this.historia = new Array<Record>();
    }

    ngOnInit() {
        this.historyService.loadStats(parseInt(localStorage.getItem("currentUser"),10)).then((record) => {
            this.historia = record;
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }



}