import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {ObservableInput} from "rxjs/Observable";

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    register(username: string, password: string, firstName: string, lastName: string, email: string): Observable<boolean> {
        return this.http.post('/user/register', { login: username, password: password,  first_name: firstName, last_name: lastName, e_mail: email})
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

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/user/login', { login: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().body && response.json().body.token;
                if (token) {
                    // set token property
                    this.token = token;
                    let id = response.json().body.id;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', id);
                    localStorage.setItem('token', token);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }
}