import { ApplicationConfig } from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { LoadingHttpInterceptor } from './shared/interceptors/loading-http.interceptor';
import { TemplateTitleStrategy } from './shared/services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingHttpInterceptor,
      multi: true,
    },
    MessageService, //need some understanding
    {
      provide: TitleStrategy,
      useClass: TemplateTitleStrategy,
    },
  ],
};
