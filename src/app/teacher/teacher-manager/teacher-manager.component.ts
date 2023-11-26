import { Component, OnInit, inject } from '@angular/core';
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
import { TeacherService } from '../../core/services/teacher.service';
import { Teacher } from '../../core/models/teacher';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-teacher-manager',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
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

    <br />

    <p-table
      [value]="teachers"
      styleClass="p-datatable-gridlines"
      [tableStyle]="{ 'min-width': '50rem' }"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-teacher>
        <tr>
          <td>{{ teacher.id }}</td>
          <td>{{ teacher.name }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styleUrl: './teacher-manager.component.scss',
})
export class TeacherManagerComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly teacherService = inject(TeacherService);

  protected teachers: Teacher[] = [];

  protected teacherForm = this.fb.group({
    name: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAllTeachers();
  }

  protected getAllTeachers() {
    this.teacherService
      .getAll()
      .subscribe((teachers) => (this.teachers = teachers));
  }

  protected submit() {
    if (this.teacherForm.invalid) {
      this.teacherName.markAsDirty({ onlySelf: true });
      console.error('not today');
      return;
    }

    this.teacherService
      .create(this.teacherForm.getRawValue() as Teacher)
      .subscribe((body) => {
        console.info('criado com sucesso = ' + JSON.stringify(body));
        this.teacherForm.reset();
        this.getAllTeachers();
      });
  }

  get teacherName() {
    return this.teacherForm.get('name') as AbstractControl;
  }
}
