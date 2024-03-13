import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { StoreModule } from '@ngrx/store';
import { TableComponent } from '../table/table.component';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsComponent, TableComponent],
      imports:[StoreModule.forRoot({})]
    });
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
