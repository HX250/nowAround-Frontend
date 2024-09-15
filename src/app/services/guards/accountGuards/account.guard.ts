import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../auth/loginService/login.service';

export const authGuard = () => {
  const router = inject(Router);
  const login = inject(LoginService);
  if (!login.isLoggedIn) {
    router.navigateByUrl('homepage');
    return false;
  } else {
    return true;
  }
};
