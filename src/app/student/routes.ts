import { Route } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';

export default [
  { path: 'create-student', component: CreateStudentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
] satisfies Route[];
