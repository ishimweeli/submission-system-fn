import { Component, Input } from '@angular/core';
import { StudentData } from 'src/app/types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() tbData: StudentData[] | null = [];
}

export interface TableHead {
  staffid: string;
  name: string;
  email: string;
}
