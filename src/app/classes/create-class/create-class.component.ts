import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
import { Modality } from '../../core/models';
import { Teacher } from '../../core/models/teacher';
import {
  ClassesService,
  ModalityService,
  TeacherService,
} from '../../core/services';
import { WeekDays } from '../../shared/models';
import { WeekDaysService } from '../../shared/services';
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

  protected modalities$ = new Observable<Modality[]>();
  protected teachers$ = new Observable<Teacher[]>();
  protected weekDays$ = new Observable<WeekDays[]>();

  protected classForm = this.fb.group({
    name: [''],
    modality: ['', Validators.required],
    teacher: ['', Validators.required],
    weekDays: [[], Validators.required],
  });

  ngOnInit(): void {
    this.modalities$ = this.modalityService.findAll();
    this.teachers$ = this.teacherService.getAll();
    this.weekDays$ = this.weekDaysService.getAll();
  }

  protected submit() {
    if (this.classForm.invalid) {
      FormUtils.markAllControlsAsDirty([this.classForm]);
      return;
    }

    this.classService.create(this.classForm.getRawValue()).subscribe(() => {
      this.classForm.reset();
    });
  }
}
