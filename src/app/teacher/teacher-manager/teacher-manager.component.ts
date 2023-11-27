import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TeacherService } from '../../core/services/teacher.service';
import { Teacher } from '../../core/models/teacher';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { CreateTeacherComponent } from '../create-teacher/create-teacher.component';

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
    CreateTeacherComponent,
  ],
  templateUrl: './teacher-manager.component.html',
  styleUrl: './teacher-manager.component.scss',
})
export class TeacherManagerComponent implements OnInit {
  private readonly teacherService = inject(TeacherService);

  protected teachers: Teacher[] = [];
  protected teacherToEdit: Teacher | undefined;

  protected messages: Message[] = [
    {
      severity: 'info',
      summary: 'Info',
      detail: 'Nenhum Professor cadastrado, que tal começar agora?',
    },
  ];

  ngOnInit(): void {
    this.getAllTeachers();
  }

  protected getAllTeachers() {
    this.teacherService
      .getAll()
      .subscribe((teachers) => (this.teachers = teachers));
  }

  protected rowEditInit(teacher: Teacher) {
    this.teacherToEdit = teacher;
  }

  protected onCancel() {
    this.teacherToEdit = undefined;
  }

  protected saveFinished() {
    this.getAllTeachers();
  }
}
