import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { StudentRequest } from './request';

const url = 'http://localhost:3000/students';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly httpClient = inject(HttpClient);

  public create(studentRequest: StudentRequest) {
    return this.httpClient.post<void>(url, studentRequest);
  }
}
