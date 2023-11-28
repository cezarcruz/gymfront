import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { TeacherService } from '../../core/services/teacher.service';
import { ToastService } from '../../core/services';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Teacher } from '../../core/models/teacher';

@Component({
  selector: 'app-create-teacher',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.scss',
})
export class CreateTeacherComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly teacherService = inject(TeacherService);
  private readonly toastService = inject(ToastService);

  protected isEditing: boolean = false;
  protected editingId: number = 0;

  protected teacherForm = this.fb.group({
    name: ['', Validators.required],
  });

  @Output()
  public saveFinished = new EventEmitter<void>();

  @Output()
  public cancelEvent = new EventEmitter<void>();

  @Input({ required: true })
  set teacher(teacher: Teacher | undefined) {
    if (teacher) {
      this.editingId = teacher.id;
      this.isEditing = true;
      this.teacherForm.patchValue(teacher);
    }
  }

  protected submit() {
    if (this.teacherForm.invalid) {
      this.teacherName.markAsDirty({ onlySelf: true });
      console.error('not today');
      return;
    }

    if (this.isEditing && this.editingId != 0) {
      this.teacherService
        .update(this.teacherForm.getRawValue(), this.editingId)
        .subscribe((body) => {
          console.log(body);
          this.resetEditing();
          this.saveFinished.emit();
          this.toastService.showSuccessMessage(
            'Professor atualizado com sucesso',
          );
        });
      return;
    }

    this.teacherService
      .create(this.teacherForm.getRawValue())
      .subscribe((body) => {
        console.log(body);
        this.resetEditing();
        this.toastService.showSuccessMessage(
          'Professor cadastrador com sucesso',
        );

        this.saveFinished.emit();
      });
  }

  protected remove() {
    this.teacherService.remove(this.editingId).subscribe((body) => {
      console.log(body);
      this.resetEditing();
      this.saveFinished.emit();
      this.toastService.showSuccessMessage('Professor removido com sucesso');
    });
  }

  protected cancel() {
    this.resetEditing();
    this.cancelEvent.emit();
  }

  private resetEditing() {
    this.teacherForm.reset();
    this.editingId = 0;
    this.isEditing = false;
  }

  get teacherName() {
    return this.teacherForm.controls.name;
  }
}
