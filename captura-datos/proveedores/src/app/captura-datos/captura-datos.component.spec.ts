import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaDatosComponent } from './captura-datos.component';

describe('CapturaDatosComponent', () => {
  let component: CapturaDatosComponent;
  let fixture: ComponentFixture<CapturaDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
