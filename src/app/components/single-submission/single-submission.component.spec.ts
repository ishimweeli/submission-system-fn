import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSubmissionComponent } from './single-submission.component';

describe('SingleSubmissionComponent', () => {
  let component: SingleSubmissionComponent;
  let fixture: ComponentFixture<SingleSubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleSubmissionComponent]
    });
    fixture = TestBed.createComponent(SingleSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
