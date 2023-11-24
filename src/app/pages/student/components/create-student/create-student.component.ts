import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CepServiceService } from '../../../../shared/services/cep-service.service';
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
  providers: [CepServiceService],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss',
})
export class CreateStudentComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cepService: CepServiceService,
  ) {}

  studentForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.max(99)]],
    address: this.formBuilder.group({
      zipcode: ['', [Validators.required, Validators.maxLength(9)]],
      street: ['', [Validators.required]],
      num: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
    }),
  });

  public onSubmit() {
    if (this.studentForm.invalid) {
      FormUtils.markAllControlsAsDirty([this.studentForm]);
      console.error('not today');
      return;
    }

    console.log(JSON.stringify(this.studentForm.value));
  }

  public searchBy() {
    const zipcode = '13188021';

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
    return this.studentForm.get('address.zipcode')?.value;
  }
}
