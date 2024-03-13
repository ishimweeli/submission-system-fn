import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { loadStudents } from 'src/app/store/actions/auth.actions';
import { AppState, selectStudent } from 'src/app/store/selectors/auth.selectors';
import { StudentData } from 'src/app/types';
import { TableHead } from '../table/table.component';

@Component({
  selector: 'app-lecture-students',
  templateUrl: './lecture-students.component.html',
  styleUrls: ['./lecture-students.component.css']
})
export class LectureStudentsComponent {
searchText: string = '';
  onPageChange(page: number) {
    this.page = page;
    this.loadStudent();
  }
  page: number = 1;
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
    this.loadStudent();
  }
  loadStudent() {
    this.store.dispatch(loadStudents({ page: this.page }));
    this.store.select(selectStudent).subscribe((Data) => {
      this.tbData = Data;
    });
  }
  createAssignment() {
    this.modalService.CreateAssignment();
  }
}
