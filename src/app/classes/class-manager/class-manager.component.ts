import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Classes } from '../../core/models';
import { ClassStateManager } from '../class-state-manager.service';
import { ClassesListComponent } from '../classes-list/classes-list.component';
import { CreateClassComponent } from '../create-class/create-class.component';

@Component({
  selector: 'app-class-manager',
  standalone: true,
  imports: [CommonModule, CreateClassComponent, ClassesListComponent],
  providers: [ClassStateManager],
  templateUrl: './class-manager.component.html',
  styleUrl: './class-manager.component.scss',
})
export class ClassManagerComponent {
  private readonly classStateManager = inject(ClassStateManager);

  protected classToEdit: Classes | undefined;

  protected onCancel() {
    this.classToEdit = undefined;
  }

  onEdit($event: Classes) {
    this.classToEdit = $event;
    this.classStateManager.startEditing();
  }

  protected saveFinished() {
    this.classStateManager.endEditing();
  }
}
