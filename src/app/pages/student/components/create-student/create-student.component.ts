import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CepService } from '../../../../shared/services/cep-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import FormUtils from '../../../../shared/utils/form-utils';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  providers: [CepService],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss',
})
export class CreateStudentComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly cepService = inject(CepService);

  studentForm = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.max(99)]],
      address: this.formBuilder.group({
        zipcode: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(9),
          ],
        ],
        street: ['', [Validators.required]],
        num: ['', [Validators.required]],
        neighborhood: ['', [Validators.required]],
      }),
    },
    { updateOn: 'blur' },
  );

  public onSubmit() {
    if (this.studentForm.invalid) {
      FormUtils.markAllControlsAsDirty([this.studentForm]);
      console.error('not today');
      return;
    }

    console.log(JSON.stringify(this.studentForm.value));
  }

  public searchBy() {
    if (this.zipcode.invalid) {
      this.zipcode.markAsDirty();
      return;
    }

    const zipcode = this.zipcode.value;

    this.cepService.searchBy(zipcode).subscribe((data) => {
      this.studentForm.patchValue({
        address: {
          zipcode: data.zipcode,
          street: data.street,
          neighborhood: data.neighborhood,
        },
      });
    });
  }

  get zipcode() {
    return this.studentForm.get('address.zipcode') as AbstractControl;
  }
}
