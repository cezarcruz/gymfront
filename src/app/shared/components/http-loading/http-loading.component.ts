import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from '../../../core/services/loading.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-http-loading',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, DialogModule],
  templateUrl: './http-loading.component.html',
  styleUrl: './http-loading.component.scss',
})
export class HttpLoadingComponent {
  private readonly loadingService = inject(LoadingService);

  protected flag = this.loadingService.showLoading;
  protected visible = true;
}
