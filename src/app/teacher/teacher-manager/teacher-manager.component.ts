import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Teacher } from '../../core/models/teacher';
import { CreateTeacherComponent } from '../create-teacher/create-teacher.component';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';
import { TeacherStateService } from '../teacher-state.service';

@Component({
  selector: 'app-teacher-manager',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    ReactiveFormsModule,
    InputTextModule,
    CreateTeacherComponent,
    TeacherListComponent,
  ],
  templateUrl: './teacher-manager.component.html',
  styleUrl: './teacher-manager.component.scss',
})
export class TeacherManagerComponent {
  private readonly teacherStateService = inject(TeacherStateService);

  protected teacherToEdit: Teacher | undefined;

  protected onCancel() {
    this.teacherToEdit = undefined;
  }

  onEdit($event: Teacher) {
    this.teacherToEdit = $event;
    this.teacherStateService.starEditing();
  }

  protected saveFinished() {
    this.teacherStateService.endEditing();
  }
}
