import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    public isLogged() {
        return localStorage.getItem('currentUser');
    }
}