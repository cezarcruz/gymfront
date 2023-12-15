import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MenubarModule,
  ],
  template: `
    <p-menubar [model]="menuItens">
      <ng-template pTemplate="start">
        <div class="ml-2 mr-2">
          <a class="pi pi-home" style="font-size: 1.5rem" routerLink="/home">
          </a>
        </div>
      </ng-template>
    </p-menubar>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  protected menuItens: MenuItem[] | undefined;

  ngOnInit(): void {
    this.menuItens = [
      {
        label: 'Students',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/students/create-student',
          },
        ],
      },
      {
        label: 'Management',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Class',
            icon: 'pi pi-fw pi-sliders-h',
            routerLink: '/classes/management',
          },
          {
            label: 'Modality',
            icon: 'pi pi-fw pi-sliders-h',
            routerLink: '/modality/management',
          },
          {
            label: 'Teacher',
            icon: 'pi pi-fw pi-sliders-h',
            routerLink: '/teacher/management',
          },
        ],
      },
    ];
  }
}
