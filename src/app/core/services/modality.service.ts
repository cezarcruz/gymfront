import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Modality } from '../models';
import { ModalityRequest } from './request';

@Injectable({
  providedIn: 'root',
})
export class ModalityService {
  private readonly url = environment.apiUrl;

  private readonly http = inject(HttpClient);

  public create(modality: ModalityRequest): Observable<void> {
    return this.http.post<void>(this.url + '/modalities', modality);
  }

  public findAll(): Observable<Modality[]> {
    return this.http.get<Modality[]>(this.url + '/modalities');
  }

  public update(modality: ModalityRequest, id: number) {
    return this.http.put<void>(this.url + '/modalities/' + id, modality);
  }

  public remove(id: number) {
    return this.http.delete<void>(this.url + '/modalities/' + id);
  }
}
