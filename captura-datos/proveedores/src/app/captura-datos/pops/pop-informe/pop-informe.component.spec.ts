import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopInformeComponent } from './pop-informe.component';

describe('PopInformeComponent', () => {
  let component: PopInformeComponent;
  let fixture: ComponentFixture<PopInformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopInformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
