import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Teacher } from '../../core/models/teacher';
import { TeacherService } from '../../core/services';
import { TeacherStateService } from '../teacher-state.service';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [TableModule, MessagesModule, AsyncPipe, ButtonModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss',
})
export class TeacherListComponent implements OnInit {
  private readonly teacherService = inject(TeacherService);
  private readonly teacherStateService = inject(TeacherStateService);
  private readonly destroyRef = inject(DestroyRef);

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
    this.teacherStateService
      .editingSubscriber()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value == false) {
          this.getAllTeachers();
        }
      });
  }

  protected getAllTeachers() {
    console.log('getting all teachers');

    this.teachers$ = this.teacherService.getAll();
  }

  protected rowEditInit(teacher: Teacher) {
    this.edit.emit(teacher);
  }
}
