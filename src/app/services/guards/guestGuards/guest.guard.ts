import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const guestGuard = () => {
  const router = inject(Router);
  const cookie = inject(CookieService);
  if (!cookie.get('role')) {
    router.navigateByUrl('/');
    return false;
  } else {
    return true;
  }
};
