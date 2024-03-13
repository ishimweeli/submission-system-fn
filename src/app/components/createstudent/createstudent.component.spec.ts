import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestudentComponent } from './createstudent.component';
import { StoreModule } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreatestudentComponent', () => {
  let component: CreatestudentComponent;
  let fixture: ComponentFixture<CreatestudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatestudentComponent],
      imports:[StoreModule.forRoot({}),ReactiveFormsModule],
      providers:[NgbActiveModal]
    });
    fixture = TestBed.createComponent(CreatestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
