import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import {Record} from '../models/record';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HistoryService {
    public token: string;

    constructor(private http: Http) {
        this.token = localStorage.getItem('token');
    }

    public loadStats(id:number) : Promise<Record[]> {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/history?id=" + id, options).toPromise().then(response => response.json() as Record[])
            .catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
    }

    public loadLast(id : number) : Promise<Record[]> {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/history/last?id=" + id, options).toPromise().then(response => response.json() as Record[])
            .catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
    }
}