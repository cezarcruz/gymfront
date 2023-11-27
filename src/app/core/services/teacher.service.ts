import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TeacherRequest } from './request/teacher-request';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';

const url = 'http://localhost:3000/teachers';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly httpClient = inject(HttpClient);

  public create(teacher: TeacherRequest): Observable<Teacher> {
    return this.httpClient.post<Teacher>(url, teacher);
  }

  public getAll(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(url);
  }

  public update(teacher: TeacherRequest, id: number): Observable<Teacher> {
    return this.httpClient.put<Teacher>(url + `/${id}`, teacher);
  }

  public remove(id: number): Observable<unknown> {
    return this.httpClient.delete(url + `/${id}`);
  }
}
