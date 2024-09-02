import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roleGuard = () => {
  const router = inject(Router);
  const role = localStorage.getItem('role');
  if (role === 'user') {
    router.navigateByUrl('/');
    return false;
  } else {
    return true;
  }
};
