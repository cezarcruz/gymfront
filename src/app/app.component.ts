import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpLoadingComponent } from './shared/components/http-loading/http-loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HttpLoadingComponent,
    ToastModule,
  ],
  providers: [],
  template: `
    @defer {
      <p-toast />
      <app-http-loading />
    }
    <app-header />
    <div class="m-4">
      <router-outlet />
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
