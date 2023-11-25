import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // refactor, hate _ as identifier
  private _showLoading = signal(false);

  public show(): void {
    this._showLoading.update(() => true);
  }

  public hide(): void {
    this._showLoading.update(() => false);
  }

  get showLoading() {
    return this._showLoading.asReadonly();
  }
}
