import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateModalityComponent } from '../create-modality/create-modality.component';
import { ModalityListComponent } from '../modality-list/modality-list.component';

@Component({
  selector: 'app-modality-manager',
  standalone: true,
  imports: [CommonModule, CreateModalityComponent, ModalityListComponent],
  templateUrl: './modality-manager.component.html',
  styleUrl: './modality-manager.component.scss',
})
export class ModalityManagerComponent {}
