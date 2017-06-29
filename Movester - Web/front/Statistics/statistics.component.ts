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
        this.historia = [];
    }

    ngOnInit() {
        this.historyService.loadAll().then((record) => {
            this.historia = record;
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }

}