import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Page } from '../models';
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
    return this.httpClient
      .get<Page<Teacher>>(this.url + '/teachers')
      .pipe(map((item) => item.elements));
  }

  public update(teacher: TeacherRequest, id: string): Observable<Teacher> {
    return this.httpClient.put<Teacher>(this.url + `/teachers/${id}`, teacher);
  }

  public remove(id: string): Observable<unknown> {
    return this.httpClient.delete(this.url + '/teachers' + `/${id}`);
  }
}
