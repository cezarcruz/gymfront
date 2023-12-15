import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Classes } from '../../core/models';
import { ClassesService } from '../../core/services';
import { WeekDaysPipe } from '../../shared/pipes';

@Component({
  selector: 'app-classes-list',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule, MessagesModule, WeekDaysPipe],
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.scss',
})
export class ClassesListComponent implements OnInit {
  private readonly classesService = inject(ClassesService);

  protected classes$ = new Observable<Classes[]>();

  protected messages: Message[] = [
    {
      severity: 'info',
      summary: 'Info',
      detail: 'Nenhuma Aula cadastrada, que tal começar agora?',
    },
  ];

  ngOnInit(): void {
    this.classes$ = this.classesService.getAll();
  }

  rowEditInit(classes: Classes): void {
    console.log(classes);
  }
}
