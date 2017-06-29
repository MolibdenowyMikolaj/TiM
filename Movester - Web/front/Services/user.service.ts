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

    public updateProfile(username: string, password: string, firstName: string, lastName: string, email: string, confirmationPassword:string) : Observable<boolean> {
        return this.http.post('/user/update', { login: username, password: password,  first_name: firstName, last_name: lastName, e_mail: email, confirmation_password: confirmationPassword})
            .map((response: Response) => {
                // check resonse
                let res = response.json() && response.json().status;
                if (res === 'OK') {
                    // return true to indicate successful register
                    return true;
                } else {
                    // return false to indicate failed register
                    return false;
                }
            });
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

    public loadFriends() : Promise<User[]> {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/user/friends", options).toPromise().then(response => response.json() as User[])
            .catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
    }

    public searchUser(val:string) : Promise<number> {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get("/user/search?val=" + val, options).toPromise().then(response => response.json().id_user as number)
            .catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
    }

    public addFriend(userId:number) : void {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        this.http.post('/user/friend', { id_user: userId}, options).subscribe();
    }

    public removeFriend(userId:number) : void {
        let headers = new Headers();
        let authToken = localStorage.getItem("token");
        headers.append('Authorization', authToken);
        let options = new RequestOptions({ headers: headers });
        this.http.post('/user/unfriend', { id_user: userId}, options).subscribe();
    }
}