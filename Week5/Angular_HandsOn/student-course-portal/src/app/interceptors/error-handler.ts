import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        notificationService.add('Session expired. Redirecting to home.');
        router.navigate(['/']);
      }

      if (error.status >= 500) {
        notificationService.add('A server error occurred. Please try again later.');
      }

      return throwError(() => error);
    })
  );
};
