import {Component, Input, OnInit} from '@angular/core';
import {HistoryService} from "../services/index";
import {Record} from "../models/index"
import {Survey} from "../models/survey";
import {AgmCoreModule} from'@agm/core';

@Component({
    selector: 'home',
    templateUrl: 'front/home/home.component.html'
})
export class HomeComponent {

    lastRecord: Record;
    details : Survey[];

    lat: number = 51.678418;
    lng: number = 7.809007;

    constructor(private historyService: HistoryService) {
        this.details = [];
    }

    ngOnInit() {
        this.historyService.getIndexLast().then((id) => {
            this.historyService.loadAll().then((records) => {
               for(let i = 0; i < records.length; i++) {
                   if(records[i].id_record == id)
                       this.lastRecord = records[i];
               }
            });
            this.historyService.loadDetails(id).then((surveys) => {
                this.details = surveys;
                if(surveys.length > 0){
                    this.lat = surveys[0].latitude_end;
                    this.lng = surveys[0].longitude_end;
                }
            });
        }, function (err) {
            console.log(err); // Error: "It broke"
        });
    }

}