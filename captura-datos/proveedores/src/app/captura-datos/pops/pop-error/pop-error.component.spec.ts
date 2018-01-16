import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopErrorComponent } from './pop-error.component';

describe('PopErrorComponent', () => {
  let component: PopErrorComponent;
  let fixture: ComponentFixture<PopErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
