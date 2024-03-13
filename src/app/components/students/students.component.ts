import { Component } from '@angular/core';
import { TableHead } from '../table/table.component';
import { Store } from '@ngrx/store';
import { AppState, selectStudent } from 'src/app/store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { StudentData } from 'src/app/types';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { loadStudents } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  page: number = 1;
  totalPages: number = 0;
  upload() {
    this.modalService.upLoad();
  }
  tbHead: TableHead[] = [
    {
      name: 'name',
      staffid: 'staff ID',
      email: 'email'
    }
  ];
  tbData: StudentData[] = [];
  loading$: Observable<boolean> = this.store.select((state) => state.students.isLoading);
  totalPages$: Observable<number> = this.store.select(
    (state) => state.students.students.data.totalPages
  );
  constructor(
    private store: Store<AppState>,
    private modalService: CustomValidatorsService
  ) {}
  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    this.store.dispatch(loadStudents({ page: this.page }));
    this.store.select(selectStudent).subscribe((Data) => {
      this.tbData = Data;
      this.totalPages = Math.ceil(this.tbData.length / 10);
    });
  }
  createStudent() {
    this.modalService.createStudent('Tell us a little about the student you are adding');
  }
  onPageChange(page: number) {
    this.page = page;
    this.loadItems();
  }
}
