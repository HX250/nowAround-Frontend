import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, switchMap, take } from 'rxjs';
import { CustomAuthService } from '../../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServ = inject(AuthService);
  const customAuth = inject(CustomAuthService);

  return authServ.isAuthenticated$.pipe(
    take(1),
    switchMap((isAuth) =>
      customAuth.roleState$.pipe(
        take(1),
        map((role) => {
          if (role === 'Admin' && isAuth) {
            return true;
          } else {
            router.navigateByUrl('/');
            sessionStorage.clear();
            return false;
          }
        }),
      ),
    ),
  );
};
