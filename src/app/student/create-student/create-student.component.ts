import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CepService } from '../../core/services';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import FormUtils from '../../shared/utils/form-utils';

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
  private readonly fb = inject(FormBuilder);
  private readonly cepService = inject(CepService);

  studentForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.max(99)]],
      address: this.fb.group({
        zipcode: [
          '01310-930',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(9),
          ],
        ],
        street: [{ value: '', disabled: true }, [Validators.required]],
        num: [{ value: '', disabled: true }, [Validators.required]],
        neighborhood: [{ value: '', disabled: true }, [Validators.required]],
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

      this.address?.enable();
    });
  }

  get address() {
    return this.studentForm.get('address');
  }

  get zipcode() {
    return this.studentForm.get('address.zipcode') as AbstractControl;
  }
}
