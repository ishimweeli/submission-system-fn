import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureStudentsComponent } from './lecture-students.component';

describe('LectureStudentsComponent', () => {
  let component: LectureStudentsComponent;
  let fixture: ComponentFixture<LectureStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LectureStudentsComponent]
    });
    fixture = TestBed.createComponent(LectureStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
