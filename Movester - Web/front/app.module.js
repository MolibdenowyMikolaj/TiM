"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const http_2 = require("@angular/http");
const app_component_1 = require("./app.component");
const app_routing_1 = require("./app.routing");
const auth_guard_1 = require("./auth.guard");
const index_1 = require("./services/index");
const index_2 = require("./login/index");
const index_3 = require("./register/index");
const index_4 = require("./home/index");
const index_5 = require("./social/index");
const index_6 = require("./statistics/index");
const index_7 = require("./profile/index");
const index_8 = require("./view/index");
const index_9 = require("./pipes/index");
const core_2 = require("@agm/core");
const common_1 = require("@angular/common");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            core_2.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyC8Cdai4ee9rMqyKEqSPPdl_mgXUO10uaY'
            }),
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            index_2.LoginComponent,
            index_3.RegisterComponent,
            index_4.HomeComponent,
            index_5.SocialComponent,
            index_6.StatisticsComponent,
            index_7.ProfileComponent,
            index_8.ViewComponent,
            index_9.PairsPipe
        ],
        providers: [
            auth_guard_1.AuthGuard,
            index_1.AuthenticationService,
            index_1.UserService,
            index_1.HistoryService,
            http_2.BaseRequestOptions
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map