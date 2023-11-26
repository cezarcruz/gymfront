import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./home/routes') },
  { path: 'students', loadChildren: () => import('./student/routes') },
  { path: 'classes', loadChildren: () => import('./classes/routes') },
  { path: 'modality', loadChildren: () => import('./modality/routes') },
  { path: 'teacher', loadChildren: () => import('./teacher/routes') },
];
