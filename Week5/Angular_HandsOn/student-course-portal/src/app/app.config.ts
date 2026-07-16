import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth';
import { errorHandlerInterceptor } from './interceptors/error-handler';
import { loadingInterceptor } from './interceptors/loading';
import { CourseEffects } from './store/course/course.effects';
import { courseFeatureKey, courseReducer } from './store/course/course.reducer';
import { enrollmentFeatureKey, enrollmentReducer } from './store/enrollment/enrollment.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      authInterceptor,
      errorHandlerInterceptor,
      loadingInterceptor
    ])),
    provideStore(),
    provideState(courseFeatureKey, courseReducer),
    provideState(enrollmentFeatureKey, enrollmentReducer),
    provideEffects([CourseEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
};
