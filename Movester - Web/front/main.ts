import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {SERVER_HTTP_PROVIDERS} from "@angular/platform-server/src/http";
import {ROUTER_PROVIDERS} from "@angular/router/src/router_module";

platformBrowserDynamic().bootstrapModule(AppModule);