import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() Dashboard: Dashboard[] = [];
  @Input() classMain: string = '';
  @Input() classContainer: string = '';
  @Input() classLinks: string = '';
  @Input() classProfileContainer: string = '';
  @Input() classProfile: string = '';
  firstName:string | null = localStorage.getItem('firstName')
  constructor() {}

  @Output() logout = new EventEmitter();

  Logout() {
    this.logout.emit();
  }
}

export interface Dashboard {
  name: string;
  link: string;
}
