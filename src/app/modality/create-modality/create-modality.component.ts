import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { Modality } from '../../core/models';
import { ModalityService } from '../../core/services';
import { ToastService } from '../../shared/services';
import FormUtils from '../../shared/utils/form-utils';

@Component({
  selector: 'app-create-modality',
  standalone: true,
  imports: [PanelModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './create-modality.component.html',
  styleUrl: './create-modality.component.scss',
})
export class CreateModalityComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly modalityService = inject(ModalityService);
  private readonly toastService = inject(ToastService);

  protected isEditing: boolean = false;
  protected editingId: string = '0';

  protected modalityForm = this.fb.group({
    name: ['', Validators.required],
  });

  @Output()
  public saveFinished = new EventEmitter<void>();

  @Output()
  public cancelEvent = new EventEmitter<void>();

  @Input({ required: true })
  set modality(modality: Modality | undefined) {
    if (modality) {
      (this.editingId = modality.id), (this.isEditing = true);
      this.modalityForm.patchValue(modality);
    }
  }

  protected submit() {
    if (this.modalityForm.invalid) {
      FormUtils.markAllControlsAsDirty([this.modalityForm]);
      return;
    }

    if (this.editingId && this.editingId != '0') {
      this.modalityService
        .update(this.modalityForm.getRawValue(), this.editingId)
        .subscribe(() => {
          this.resetEditing();
          this.saveFinished.emit();
          this.toastService.showSuccessMessage(
            'Modalidade atualizada com sucesso',
          );
        });

      return;
    }

    this.modalityService
      .create(this.modalityForm.getRawValue())
      .subscribe(() => {
        this.modalityForm.reset();
        this.toastService.showSuccessMessage(
          'Modalidade cadastrada com sucesso',
        );
        this.saveFinished.emit();
      });
  }

  protected remove() {
    this.modalityService.remove(this.editingId).subscribe(() => {
      this.resetEditing();
      this.saveFinished.emit();
      this.toastService.showSuccessMessage('Professor removido com sucesso');
    });
  }

  protected cancel() {
    this.resetEditing();
    this.cancelEvent.emit();
  }

  private resetEditing() {
    this.modalityForm.reset();
    this.editingId = '0';
    this.isEditing = false;
  }
}
