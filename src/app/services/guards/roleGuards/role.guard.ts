import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const roleGuard = () => {
  const router = inject(Router);
  const cookie = inject(CookieService);
  const role = cookie.get('role');
  if (role === 'user') {
    router.navigateByUrl('/');
    return false;
  } else {
    return true;
  }
};
