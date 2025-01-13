import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  if (!shouldIntercept(req.url)) {
    return next(req);
  }

  return auth.getAccessTokenSilently().pipe(
    switchMap((token) => {
      const authReq = token
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          })
        : req;
      return next(authReq);
    }),
  );
};

function shouldIntercept(url: string): boolean {
  const targetUrls = [
    'Establishment/pending',
    'monthlystatistic/2024',
    'Establishment/register-status',
    'Establishment/menu',
    'Establishment/menu/item/image',
    'Establishment/picture',
    'Establishment/generic-info',
    'Post',
    'Event',
  ];
  return targetUrls.some((targetUrl) => url.includes(targetUrl));
}
