import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable({ providedIn: 'root' })
export class LoadingHttpInterceptor implements HttpInterceptor {
  private readonly loadingService = inject(LoadingService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    let counter = 0;

    return next.handle(req).pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: () => {
          counter = counter++;
          this.loadingService.show();
        },
        // Operation failed; error is an HttpErrorResponse
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        counter = counter--;

        if (counter === 0) {
          setTimeout(() => {
            this.loadingService.hide();
          }, 10_000);
        }
      }),
    );
  }
}
