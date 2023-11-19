import { Route } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

export default [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'}
] satisfies Route[];