import { BehaviorSubject } from 'rxjs';

export interface StateService {
  startEditing(): void;
  endEditing(): void;
  editingSubscriber(): BehaviorSubject<boolean>;
}
