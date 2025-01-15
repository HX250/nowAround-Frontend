import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { CustomAuthService } from '../../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const customAuth = inject(CustomAuthService);

  return customAuth.roleState$.pipe(
    take(1),
    map((role) => {
      if (role === 'Admin') {
        router.navigateByUrl('admin-page');
        return false;
      } else if (role === 'Establishment') {
        router.navigateByUrl('establishment');
        return false;
      } else {
        return true;
      }
    }),
  );
};
