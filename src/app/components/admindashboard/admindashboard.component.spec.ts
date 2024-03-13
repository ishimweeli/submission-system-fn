import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admindashboard.component';
import { StoreModule } from '@ngrx/store';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports:[StoreModule.forRoot({})]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
