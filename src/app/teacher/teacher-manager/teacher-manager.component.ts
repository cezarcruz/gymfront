import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Teacher } from '../../core/models/teacher';
import { CreateTeacherComponent } from '../create-teacher/create-teacher.component';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';

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
  protected teacherToEdit: Teacher | undefined;

  protected editing = false;

  protected onCancel() {
    this.editing = false;
    this.teacherToEdit = undefined;
  }

  onEdit($event: Teacher) {
    this.editing = true;
    this.teacherToEdit = $event;
  }

  protected saveFinished() {
    this.editing = false;
  }
}
