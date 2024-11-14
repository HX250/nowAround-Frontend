import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServ = inject(AuthService);
  const cookie = inject(CookieService);

  return authServ.isAuthenticated$.pipe(
    map((isAuth) => {
      const role = cookie.get('role');

      if (role === 'Admin' || (role === 'Establishment' && isAuth)) {
        return true;
      } else {
        router.navigateByUrl('/');
        return false;
      }
    }),
  );
};
