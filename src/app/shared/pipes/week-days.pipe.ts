import { Pipe, PipeTransform, inject } from '@angular/core';
import { WeekDaysService } from '../services';

@Pipe({
  standalone: true,
  name: 'appWeekDays',
})
export class WeekDaysPipe implements PipeTransform {
  private readonly weekDaysService = inject(WeekDaysService);

  transform(weekDays: string[]) {
    const days = this.weekDaysService.getAllReadOnly();

    return days
      .filter((day) => weekDays.includes(day.label))
      .map((filteredDay) => filteredDay.name)
      .join(', ')
      .trim();
  }
}
