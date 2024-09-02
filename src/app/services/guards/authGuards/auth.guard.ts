import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  if (localStorage.getItem('role')) {
    router.navigateByUrl('homepage');
    return false;
  } else {
    return true;
  }
};
