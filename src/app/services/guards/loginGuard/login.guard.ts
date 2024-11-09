import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { CustomAuthService } from '../../authService/auth.service';

export const loginGuard = () => {
  const router = inject(Router);
  const customAuth = inject(CustomAuthService);
  const authServ = inject(AuthService);
  const cookie = inject(CookieService);

  return authServ.isAuthenticated$.pipe(
    map((isAuth) => {
      if (cookie.get('role') && isAuth) {
        return true;
      } else {
        router.navigateByUrl('');
        customAuth.loginWithRedirect();
        return false;
      }
    }),
  );
};
