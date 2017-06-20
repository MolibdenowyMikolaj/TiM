import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import {User} from '../models/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    public token: string;

    constructor(private http: Http) {
        this.token = localStorage.getItem('token');
    }

    public loadUser(id: number) : Promise<User> {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/user/data?id=" + id, options).toPromise().then(response => response.json()[0] as User)
            .catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
    }

    public loadFriends(id: number) : Promise<User[]> {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/user/friends?id=" + id, options).toPromise().then(response => response.json() as User[])
            .catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
    }
}