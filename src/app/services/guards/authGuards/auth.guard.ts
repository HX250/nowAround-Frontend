import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@auth0/auth0-angular';

export const authGuard = () => {
  const router = inject(Router);
  const authServ = inject(AuthService);
  const cookie = inject(CookieService);
  if (cookie.get('role') && authServ.isAuthenticated$) {
    router.navigateByUrl('homepage');
    return false;
  } else {
    return true;
  }
};
