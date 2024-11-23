import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { CustomAuthService } from '../../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const customAuth = inject(CustomAuthService);

  return customAuth.roleState$.pipe(
    map((role) => {
      if (role === 'Admin' || role === 'Establishment') {
        router.navigateByUrl('admin-page');
        return false;
      } else {
        return true;
      }
    }),
  );
};
