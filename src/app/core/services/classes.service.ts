import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Classes } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private readonly httpClient = inject(HttpClient);

  private readonly url = environment.apiUrl;

  public getAll(): Observable<Classes[]> {
    return this.httpClient.get<Classes[]>(this.url + '/classes');
  }

  public create(classes: Classes): Observable<void> {
    return this.httpClient.post<void>(this.url + '/classes', classes);
  }
}
