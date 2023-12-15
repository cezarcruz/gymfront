import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Classes } from '../models';
import { ClassesRequest } from './request';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private readonly httpClient = inject(HttpClient);

  private readonly url = environment.apiUrl;

  public getAll(): Observable<Classes[]> {
    return this.httpClient.get<Classes[]>(this.url + '/classes');
  }

  public create(classes: ClassesRequest): Observable<void> {
    return this.httpClient.post<void>(this.url + '/classes', classes);
  }

  public update(classes: ClassesRequest, id: number): Observable<void> {
    return this.httpClient.put<void>(this.url + '/classes' + id, classes);
  }

  public remove(id: number) {
    return this.httpClient.delete<void>(this.url + '/classes/' + id);
  }
}
