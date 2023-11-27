import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TeacherService } from '../../core/services/teacher.service';
import { Teacher } from '../../core/models/teacher';
import { TableModule } from 'primeng/table';
import { ToastService } from '../../core/services';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

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
    MessagesModule,
  ],
  templateUrl: './teacher-manager.component.html',
  styleUrl: './teacher-manager.component.scss',
})
export class TeacherManagerComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly teacherService = inject(TeacherService);
  private readonly toastService = inject(ToastService);

  protected teachers: Teacher[] = [];

  protected isEditing: boolean = false;
  protected editingId: number = 0;

  protected messages: Message[] = [
    {
      severity: 'info',
      summary: 'Info',
      detail: 'Nenhum Professor cadastrado, que tal comećar agora?',
    },
  ];

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

    if (this.isEditing && this.editingId != 0) {
      this.teacherService
        .update(this.teacherForm.getRawValue(), this.editingId)
        .subscribe((body) => {
          console.log(body);
          this.resetEditing();
          this.getAllTeachers();
          this.toastService.showSuccessMessage(
            'Professor atualizado com sucesso',
          );
        });
      return;
    }

    this.teacherService
      .create(this.teacherForm.getRawValue())
      .subscribe((body) => {
        console.log(body);
        this.teacherForm.reset();
        this.getAllTeachers();
        this.toastService.showSuccessMessage(
          'Professor cadastrador com sucesso',
        );
      });
  }

  protected remove() {
    this.teacherService.remove(this.editingId).subscribe((body) => {
      console.log(body);
      this.resetEditing();
      this.getAllTeachers();
      this.toastService.showSuccessMessage('Professor removido com sucesso');
    });
  }

  protected rowEditInit(teacher: Teacher) {
    this.isEditing = true;
    this.editingId = teacher.id;
    this.teacherForm.patchValue(teacher);
  }

  private resetEditing() {
    this.teacherForm.reset();
    this.editingId = 0;
    this.isEditing = false;
  }

  get teacherName() {
    return this.teacherForm.get('name') as AbstractControl;
  }
}
