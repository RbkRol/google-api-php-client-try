import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopArchivoComponent } from './pop-archivo.component';

describe('PopArchivoComponent', () => {
  let component: PopArchivoComponent;
  let fixture: ComponentFixture<PopArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
