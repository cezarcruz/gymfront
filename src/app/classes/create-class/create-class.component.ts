import { AsyncPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { Observable } from 'rxjs';
import { Classes, Modality } from '../../core/models';
import { Teacher } from '../../core/models/teacher';
import {
  ClassesService,
  ModalityService,
  TeacherService,
} from '../../core/services';
import { WeekDays } from '../../shared/models';
import { ToastService, WeekDaysService } from '../../shared/services';
import FormUtils from '../../shared/utils/form-utils';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
  ],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.scss',
})
export class CreateClassComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly modalityService = inject(ModalityService);
  private readonly teacherService = inject(TeacherService);
  private readonly weekDaysService = inject(WeekDaysService);
  private readonly classService = inject(ClassesService);
  private readonly toastService = inject(ToastService);

  protected modalities$ = new Observable<Modality[]>();
  protected teachers$ = new Observable<Teacher[]>();
  protected weekDays$ = new Observable<WeekDays[]>();

  protected isEditing: boolean = false;
  protected editingId: number = 0;

  protected classForm = this.fb.group({
    name: [''],
    modality: ['', Validators.required],
    teacher: ['', Validators.required],
    weekDays: [[], Validators.required],
  });

  @Output()
  public saveFinished = new EventEmitter<void>();

  @Output()
  public cancelEvent = new EventEmitter<void>();

  @Input({ required: true })
  set classes(classes: Classes | undefined) {
    if (classes) {
      this.editingId = classes.id;
      this.isEditing = true;
      this.classForm.patchValue(classes);
    }
  }

  public ngOnInit(): void {
    this.modalities$ = this.modalityService.findAll();
    this.teachers$ = this.teacherService.getAll();
    this.weekDays$ = this.weekDaysService.getAll();
  }

  protected submit() {
    if (this.classForm.invalid) {
      FormUtils.markAllControlsAsDirty([this.classForm]);
      return;
    }

    if (this.isEditing && this.editingId != 0) {
      this.classService
        .update(this.classForm.getRawValue(), this.editingId)
        .subscribe(() => {
          this.resetEditing();
          this.saveFinished.emit();
          this.toastService.showSuccessMessage('Aula atualizada com sucesso');
        });
      return;
    }

    this.teacherService.create(this.classForm.getRawValue()).subscribe(() => {
      this.resetEditing();
      this.toastService.showSuccessMessage('Aula cadastrada com sucesso');

      this.saveFinished.emit();
    });
  }

  protected remove() {
    this.classService.remove(this.editingId).subscribe(() => {
      this.resetEditing();
      this.saveFinished.emit();
      this.toastService.showSuccessMessage('Aula removida com sucesso');
    });
  }

  protected cancel() {
    this.resetEditing();
    this.cancelEvent.emit();
  }

  private resetEditing() {
    this.classForm.reset();
    this.editingId = 0;
    this.isEditing = false;
  }
}
