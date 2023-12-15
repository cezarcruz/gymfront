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
import { Classes } from '../../core/models';
import { ClassesService } from '../../core/services';
import { WeekDaysPipe } from '../../shared/pipes';
import { ClassStateManager } from '../class-state-manager.service';

@Component({
  selector: 'app-classes-list',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule, MessagesModule, WeekDaysPipe],
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.scss',
})
export class ClassesListComponent implements OnInit {
  private readonly classesService = inject(ClassesService);
  private readonly classStateManager = inject(ClassStateManager);
  private readonly destroyRef = inject(DestroyRef);

  protected classes$ = new Observable<Classes[]>();

  protected messages: Message[] = [
    {
      severity: 'info',
      summary: 'Info',
      detail: 'Nenhuma Aula cadastrada, que tal começar agora?',
    },
  ];

  @Output()
  private edit = new EventEmitter<Classes>();

  public ngOnInit(): void {
    this.classStateManager
      .editingSubscriber()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value == false) {
          this.getAllClasses();
        }
      });
  }

  protected getAllClasses() {
    this.classes$ = this.classesService.getAll();
  }

  public rowEditInit(classes: Classes): void {
    this.edit.emit(classes);
  }
}
