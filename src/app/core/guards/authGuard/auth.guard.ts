import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, take } from 'rxjs';
import { CustomAuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const customAuth = inject(CustomAuthService);

  return authServ.isAuthenticated$.pipe(
    take(1),
    map((isAuth) => {
      if (isAuth) {
        return true;
      } else {
        customAuth.loginWithRedirect();
        return false;
      }
    }),
  );
};
