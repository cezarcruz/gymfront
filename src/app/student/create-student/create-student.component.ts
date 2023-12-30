import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';

import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CepService, StudentService } from '../../core/services';
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
    InputMaskModule,
    KeyFilterModule,
  ],
  providers: [CepService],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss',
})
export class CreateStudentComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly cepService = inject(CepService);
  private readonly studentService = inject(StudentService);

  studentForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      document: [''],
      contact: this.fb.group({
        phone: ['', [Validators.required]],
        email: ['', [Validators.required]],
      }),
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
        state: [{ value: '', disabled: true }, [Validators.required]],
        city: [{ value: '', disabled: true }, [Validators.required]],
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

    this.studentService.create(this.studentForm.getRawValue()).subscribe(() => {
      this.studentForm.reset();
      console.log('criado com sucesso.');
    });
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
    return this.studentForm.controls.address;
  }

  get zipcode() {
    return this.studentForm.controls.address.controls.zipcode;
  }
}
