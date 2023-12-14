import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ModalityService, ToastService } from '../../core/services';
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

  protected modalityForm = this.fb.group({
    name: ['', Validators.required],
  });

  protected submit() {
    if (this.modalityForm.invalid) {
      FormUtils.markAllControlsAsDirty([this.modalityForm]);
      return;
    }

    this.modalityService
      .create(this.modalityForm.getRawValue())
      .subscribe(() => {
        this.modalityForm.reset();
        this.toastService.showSuccessMessage(
          'Modalidade cadastrada com sucesso',
        );
      });
  }
}
