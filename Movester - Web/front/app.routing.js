"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const index_1 = require("./login/index");
const index_2 = require("./register/index");
const index_3 = require("./home/index");
const index_4 = require("./social/index");
const index_5 = require("./statistics/index");
const index_6 = require("./profile/index");
const auth_guard_1 = require("./auth.guard");
const index_7 = require("./view/index");
const appRoutes = [
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_2.RegisterComponent },
    { path: '', component: index_3.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'social', component: index_4.SocialComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'statistics', component: index_5.StatisticsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'profile', component: index_6.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'view', component: index_7.ViewComponent, canActivate: [auth_guard_1.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map