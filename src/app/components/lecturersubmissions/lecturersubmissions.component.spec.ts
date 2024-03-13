import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturersubmissionsComponent } from './lecturersubmissions.component';

describe('LecturersubmissionsComponent', () => {
  let component: LecturersubmissionsComponent;
  let fixture: ComponentFixture<LecturersubmissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturersubmissionsComponent]
    });
    fixture = TestBed.createComponent(LecturersubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
