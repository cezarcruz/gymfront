import { Route } from '@angular/router';
import { TeacherManagerComponent } from './components/teacher-manager/teacher-manager.component';

export default [
  { path: 'management', component: TeacherManagerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
] satisfies Route[];
