import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daySort',
  standalone: true,
})
export class DaySortPipe implements PipeTransform {
  transform(
    value: Record<string, any> | undefined,
  ): { key: string; value: string }[] {
    if (!value) return [];

    const daysOrder = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];

    const dayEntries = Object.entries(value)
      .filter(([key]) => daysOrder.includes(key.toLowerCase()))
      .map(([key, val]) => ({ key, value: val }));

    return dayEntries.sort(
      (a, b) =>
        daysOrder.indexOf(a.key.toLowerCase()) -
        daysOrder.indexOf(b.key.toLowerCase()),
    );
  }
}
