import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherStateService {
  private editingStateManager = new BehaviorSubject<boolean>(false);

  public starEditing() {
    this.editingStateManager.next(true);
  }

  public endEditing() {
    this.editingStateManager.next(false);
  }

  public editingSubscriber() {
    return this.editingStateManager;
  }
}
