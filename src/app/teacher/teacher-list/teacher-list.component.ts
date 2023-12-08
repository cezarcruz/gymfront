import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TeacherService } from '../../core/services';
import { Observable } from 'rxjs';
import { Teacher } from '../../core/models/teacher';
import { MessagesModule } from 'primeng/messages';
import { AsyncPipe } from '@angular/common';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [TableModule, MessagesModule, AsyncPipe, ButtonModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss',
})
export class TeacherListComponent implements OnInit {
  private readonly teacherService = inject(TeacherService);

  protected teachers$ = new Observable<Teacher[]>();

  protected messages: Message[] = [
    {
      severity: 'info',
      summary: 'Info',
      detail: 'Nenhum Professor cadastrado, que tal começar agora?',
    },
  ];

  @Output()
  private edit = new EventEmitter<Teacher>();

  ngOnInit(): void {
    this.getAllTeachers();
  }

  protected getAllTeachers() {
    console.log('getting all teachers');

    this.teachers$ = this.teacherService.getAll();
  }

  protected rowEditInit(teacher: Teacher) {
    this.edit.emit(teacher);
  }
}
