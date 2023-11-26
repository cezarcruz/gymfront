import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-teacher-manager',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  template: `
    <p-panel header="Cadastro">
      <form [formGroup]="teacherForm" (ngSubmit)="submit()">
        <div class="formgrid grid">
          <div class="field col">
            <label for="name">Nome</label>
            <input
              id="name"
              type="text"
              pInputText
              formControlName="name"
              placeholder="Ex: Carlos Alberto"
              class="w-full"
              aria-describedby="teacher-name-error"
            />
            @if (teacherName.invalid && teacherName.dirty) {
              <small id="teacher-name-error" class="p-error"
                >CEP inválido</small
              >
            }
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <button pButton class="p-button-primary" type="submit">
              Criar
            </button>
          </div>
        </div>
      </form>
    </p-panel>
  `,
  styleUrl: './teacher-manager.component.scss',
})
export class TeacherManagerComponent {
  private readonly fb = inject(FormBuilder);

  protected teacherForm = this.fb.group({
    name: ['', Validators.required],
  });

  protected submit() {
    if (this.teacherForm.invalid) {
      this.teacherName.markAsDirty({ onlySelf: true });
      console.error('not today');
      return;
    }
  }

  get teacherName() {
    return this.teacherForm.get('name') as AbstractControl;
  }
}
