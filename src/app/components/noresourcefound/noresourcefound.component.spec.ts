import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoresourcefoundComponent } from './noresourcefound.component';

describe('NoresourcefoundComponent', () => {
  let component: NoresourcefoundComponent;
  let fixture: ComponentFixture<NoresourcefoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoresourcefoundComponent]
    });
    fixture = TestBed.createComponent(NoresourcefoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
