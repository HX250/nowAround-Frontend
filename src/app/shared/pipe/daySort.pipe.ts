import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daySort',
  standalone: true,
})
export class DaySortPipe implements PipeTransform {
  transform(
    value: Record<string, string> | undefined,
  ): { key: string; value: string }[] {
    if (!value) return [];

    const daysOrder = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    return Object.entries(value)
      .map(([key, val]) => ({ key, value: val }))
      .sort((a, b) => daysOrder.indexOf(a.key) - daysOrder.indexOf(b.key));
  }
}
