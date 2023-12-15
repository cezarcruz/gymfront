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
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Modality } from '../../core/models';
import { ModalityService } from '../../core/services';
import { ModalityStateService } from '../modality-state.service';

@Component({
  selector: 'app-modality-list',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule],
  templateUrl: './modality-list.component.html',
  styleUrl: './modality-list.component.scss',
})
export class ModalityListComponent implements OnInit {
  private readonly modalityService = inject(ModalityService);
  private readonly modalityStateService = inject(ModalityStateService);
  private readonly destroyRef = inject(DestroyRef);

  protected modalities$ = new Observable<Modality[]>();

  protected messages: Message[] = [
    {
      severity: 'info',
      summary: 'Info',
      detail: 'Nenhuma modalidade cadastrada, que tal começar agora?',
    },
  ];

  @Output()
  private edit = new EventEmitter<Modality>();

  ngOnInit(): void {
    this.modalityStateService
      .editingSubscriber()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value == false) {
          this.getAllModalities();
        }
      });
  }

  protected getAllModalities(): void {
    this.modalities$ = this.modalityService.findAll();
  }

  protected rowEditInit(modality: Modality) {
    this.edit.emit(modality);
  }
}
