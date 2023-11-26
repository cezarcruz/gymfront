import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/routes') },
  { path: 'students', loadChildren: () => import('./pages/student/routes') },
  { path: 'classes', loadChildren: () => import('./pages/classes/routes') },
  { path: 'modality', loadChildren: () => import('./pages/modality/routes') },
  { path: 'teacher', loadChildren: () => import('./pages/teacher/routes') },
];
