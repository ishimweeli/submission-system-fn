import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLectureComponent } from './createLecture.component';
import { StoreModule } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateLectureComponent', () => {
  let component: CreateLectureComponent;
  let fixture: ComponentFixture<CreateLectureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLectureComponent],
      imports:[StoreModule.forRoot({}),ReactiveFormsModule],
      providers:[NgbActiveModal]
    });
    fixture = TestBed.createComponent(CreateLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
