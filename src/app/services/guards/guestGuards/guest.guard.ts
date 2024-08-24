import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const guestGuard = () => {
  const router = inject(Router);
  if (!localStorage.getItem('role')) {
    router.navigateByUrl('/');
    return false;
  } else {
    return true;
  }
};
