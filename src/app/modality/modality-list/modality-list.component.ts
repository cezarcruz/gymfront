import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Modality } from '../../core/models';
import { ModalityService } from '../../core/services';

@Component({
  selector: 'app-modality-list',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule],
  templateUrl: './modality-list.component.html',
  styleUrl: './modality-list.component.scss',
})
export class ModalityListComponent implements OnInit {
  protected readonly modalityService = inject(ModalityService);

  protected modalities$ = new Observable<Modality[]>();

  ngOnInit(): void {
    this.modalities$ = this.modalityService.findAll();
  }

  rowEditInit(item: Modality) {
    console.log(item);
  }
}
