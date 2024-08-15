import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const roleGuard = () => {
  const router = inject(Router);
  if (!localStorage.getItem('role')) {
    return true;
  } else {
    router.navigateByUrl('**');
    return false;
  }
};
