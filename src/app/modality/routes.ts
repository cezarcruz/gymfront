import { Route } from '@angular/router';
import { ModalityManagerComponent } from './modality-manager/modality-manager.component';

export default [
  {
    path: 'management',
    component: ModalityManagerComponent,
    title: 'Modality Management',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
] satisfies Route[];
