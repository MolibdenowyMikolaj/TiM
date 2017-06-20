import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './auth.guard';
import { HistoryService, AuthenticationService, UserService} from './services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { SocialComponent } from './social/index';
import { StatisticsComponent } from './statistics/index';
import { ProfileComponent } from './profile/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        SocialComponent,
        StatisticsComponent,
        ProfileComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        HistoryService,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }