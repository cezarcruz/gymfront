import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TeacherStateService implements StateService {
  private editingStateManager = new BehaviorSubject<boolean>(false);

  public startEditing() {
    this.editingStateManager.next(true);
  }

  public endEditing() {
    this.editingStateManager.next(false);
  }

  public editingSubscriber() {
    return this.editingStateManager;
  }
}
