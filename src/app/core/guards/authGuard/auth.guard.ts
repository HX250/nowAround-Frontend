import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, switchMap } from 'rxjs';
import { CustomAuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const customAuth = inject(CustomAuthService);

  return authServ.isAuthenticated$.pipe(
    switchMap((isAuth) =>
      customAuth.roleState$.pipe(
        map((role) => {
          if (role === 'User' && isAuth) {
            return true;
          } else {
            customAuth.loginWithRedirect();
            return false;
          }
        }),
      ),
    ),
  );
};
