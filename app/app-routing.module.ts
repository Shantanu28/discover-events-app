import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { APP_ROUTES } from "./app.route";

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(APP_ROUTES)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
