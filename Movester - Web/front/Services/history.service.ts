import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import {Record, Survey} from '../models/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HistoryService {
    public token: string;

    constructor(private http: Http) {
        this.token = localStorage.getItem('token');
    }

    public loadAll() : Promise<Record[]> {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/history/all", options).toPromise().then(response => response.json() as Record[])
            .catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
    }

    public getIndexLast() : Promise<number> {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/history/last", options).toPromise().then(response => response.json().id_record as number)
            .catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
    }

    public loadDetails(id:number) : Promise<Survey[]> {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/history/details?id_record=" + id, options).toPromise().then(response => response.json() as Survey[])
            .catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
    }
}