import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StudentRequest } from './request';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly httpClient = inject(HttpClient);
  private url = environment.apiUrl;

  public create(studentRequest: StudentRequest) {
    return this.httpClient.post<void>(this.url + '/students', studentRequest);
  }
}
