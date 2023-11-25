import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpLoadingComponent } from './shared/components/http-loading/http-loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HttpLoadingComponent],
  template: `
    <app-header />
    <router-outlet />
    <app-http-loading />
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'gymfront';
}
