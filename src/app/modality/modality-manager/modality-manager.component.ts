import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Modality } from '../../core/models';
import { CreateModalityComponent } from '../create-modality/create-modality.component';
import { ModalityListComponent } from '../modality-list/modality-list.component';
import { ModalityStateService } from '../modality-state.service';

@Component({
  selector: 'app-modality-manager',
  standalone: true,
  imports: [CommonModule, CreateModalityComponent, ModalityListComponent],
  providers: [ModalityStateService],
  templateUrl: './modality-manager.component.html',
  styleUrl: './modality-manager.component.scss',
})
export class ModalityManagerComponent {
  private readonly modalityStateService = inject(ModalityStateService);

  protected modalityToEdit: Modality | undefined;

  protected onCancel() {
    this.modalityToEdit = undefined;
  }

  onEdit($event: Modality) {
    this.modalityToEdit = $event;
    this.modalityStateService.startEditing();
  }

  protected saveFinished() {
    this.modalityStateService.endEditing();
  }
}
