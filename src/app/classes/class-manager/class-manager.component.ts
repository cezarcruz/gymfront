import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClassesListComponent } from '../classes-list/classes-list.component';
import { CreateClassComponent } from '../create-class/create-class.component';

@Component({
  selector: 'app-class-manager',
  standalone: true,
  imports: [CommonModule, CreateClassComponent, ClassesListComponent],
  templateUrl: './class-manager.component.html',
  styleUrl: './class-manager.component.scss',
})
export class ClassManagerComponent {}
