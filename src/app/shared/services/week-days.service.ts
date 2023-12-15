import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WeekDays } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WeekDaysService {
  private list = [
    new WeekDays('mon', 'Segunda-feira'),
    new WeekDays('tue', 'Terça-feira'),
    new WeekDays('wed', 'Quarta-feira'),
    new WeekDays('thu', 'Quinta-feira'),
    new WeekDays('fri', 'Sexta-feira'),
    new WeekDays('sat', 'Sabado'),
    new WeekDays('sun', 'Domingo'),
  ];

  public getAll(): Observable<WeekDays[]> {
    return of(this.list);
  }

  public getAllReadOnly(): WeekDays[] {
    return [...this.list];
  }
}
