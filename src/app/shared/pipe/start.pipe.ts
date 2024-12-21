import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starPipe',
  standalone: true,
})
export class StarPipe implements PipeTransform {
  transform(value: string): string {
    const starMapping: Record<string, string> = {
      oneStar: '*',
      twoStar: '* *',
      threeStars: '* * *',
      fourStars: '* * * *',
      fiveStars: '* * * * *',
    };
    return starMapping[value] || value;
  }
}
