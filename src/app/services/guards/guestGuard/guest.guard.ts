import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';

export const guestGuard = () => {
  const router = inject(Router);
  const authServ = inject(AuthService);
  const cookie = inject(CookieService);

  return authServ.isAuthenticated$.pipe(
    map((isAuth) => {
      if (cookie.get('role') || isAuth) {
        return true;
      } else {
        router.navigateByUrl('/');
        return false;
      }
    }),
  );
};
