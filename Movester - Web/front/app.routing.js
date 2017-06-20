"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const index_1 = require("./login/index");
const index_2 = require("./home/index");
const index_3 = require("./statistics/index");
const auth_guard_1 = require("./auth.guard");
const appRoutes = [
    { path: 'login', component: index_1.LoginComponent },
    { path: '', component: index_2.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'statistics', component: index_3.StatisticsComponent, canActivate: [auth_guard_1.AuthGuard] },
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map