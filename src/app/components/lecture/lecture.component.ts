import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { loadlecture } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/selectors/auth.selectors';
import { LectureState } from 'src/app/types';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent {
  page: number = 1;
  totalpages: number = 0;
  onPageChange(page: number) {
    this.page = page;
    this.laoditems();
  }

  lecturers$: Observable<LectureState> = this.store.select((state) => state.lecturers);
  totalPages$: Observable<number> = this.store.select(
    (state) => state.lecturers.lecturer.data.totalPages
  );

  constructor(
    private store: Store<AppState>,
    private modalService: CustomValidatorsService
  ) {}
  ngOnInit() {
    this.laoditems();
  }

  laoditems() {
    this.store.dispatch(loadlecture({ page: this.page }));
  }
  create() {
    this.modalService.createLecture('Tell us a little about the lecture you are adding');
  }

  upload() {
    this.modalService.upLoad();
  }
}
