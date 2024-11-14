import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { CustomAuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const customAuth = inject(CustomAuthService);
  const authServ = inject(AuthService);
  const cookie = inject(CookieService);

  return authServ.isAuthenticated$.pipe(
    map((isAuth) => {
      if (cookie.get('role') && isAuth) {
        return true;
      } else {
        customAuth.loginWithRedirect();
        return false;
      }
    }),
  );
};
