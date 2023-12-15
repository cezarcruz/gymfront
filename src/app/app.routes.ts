import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./home/routes') },
  {
    path: 'students',
    loadChildren: () => import('./student/routes'),
    title: 'Students',
  },
  {
    path: 'classes',
    loadChildren: () => import('./classes/routes'),
    title: 'Classes',
  },
  {
    path: 'modality',
    loadChildren: () => import('./modality/routes'),
    title: 'Modality',
  },
  {
    path: 'teacher',
    loadChildren: () => import('./teacher/routes'),
    title: 'Teacher',
  },
];
