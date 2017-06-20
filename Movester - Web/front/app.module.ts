import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './auth.guard';
import { HistoryService, AuthenticationService} from './services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { StatisticsComponent } from './statistics/index';

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
        HomeComponent,
        StatisticsComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        HistoryService,
        HistoryService,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }