import { Route } from '@angular/router';
import { ClassManagerComponent } from './class-manager/class-manager.component';

export default [
  { path: 'management', component: ClassManagerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
] satisfies Route[];
