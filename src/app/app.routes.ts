import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/home/routes')},
    { path: 'students', loadChildren: () => import('./pages/student/routes')}
];
