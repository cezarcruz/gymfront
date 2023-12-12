import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Teacher } from '../models/teacher';
import { TeacherRequest } from './request/teacher-request';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly httpClient = inject(HttpClient);

  private readonly url = environment.apiUrl;

  public create(teacher: TeacherRequest): Observable<Teacher> {
    return this.httpClient.post<Teacher>(this.url + '/teachers', teacher);
  }

  public getAll(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.url + '/teachers');
  }

  public update(teacher: TeacherRequest, id: number): Observable<Teacher> {
    return this.httpClient.put<Teacher>(this.url + `/teachers/${id}`, teacher);
  }

  public remove(id: number): Observable<unknown> {
    return this.httpClient.delete(this.url + '/teachers' + `/${id}`);
  }
}
