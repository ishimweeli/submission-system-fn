import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAssgnmentComponent } from './single-assgnment.component';

describe('SingleAssgnmentComponent', () => {
  let component: SingleAssgnmentComponent;
  let fixture: ComponentFixture<SingleAssgnmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleAssgnmentComponent]
    });
    fixture = TestBed.createComponent(SingleAssgnmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
