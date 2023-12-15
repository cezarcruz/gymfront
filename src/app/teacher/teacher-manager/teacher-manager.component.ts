import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Teacher } from '../../core/models/teacher';
import { CreateTeacherComponent } from '../create-teacher/create-teacher.component';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';
import { TeacherStateService } from '../teacher-state.service';

@Component({
  selector: 'app-teacher-manager',
  standalone: true,
  imports: [CommonModule, CreateTeacherComponent, TeacherListComponent],
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
    this.teacherStateService.startEditing();
  }

  protected saveFinished() {
    this.teacherStateService.endEditing();
  }
}
