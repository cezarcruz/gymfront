import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';

@Injectable({ providedIn: 'root' })
export class LoadingHttpInterceptor implements HttpInterceptor {
  private readonly loadingService = inject(LoadingService);
  private counter = 0;

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.counter = this.counter + 1;
    this.loadingService.show();

    return next.handle(req).pipe(
      // Log when response observable either completes or errors
      finalize(() => {
        this.counter = this.counter - 1;

        if (this.counter === 0) {
          this.loadingService.hide();
        }
      }),
    );
  }
}
