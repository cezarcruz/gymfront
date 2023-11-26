import { Route } from '@angular/router';
import { ModalityManagerComponent } from './components/modality-manager/modality-manager.component';

export default [
  { path: 'management', component: ModalityManagerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
] satisfies Route[];
