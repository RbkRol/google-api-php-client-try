import { TestBed, inject } from '@angular/core/testing';

import { GastosMedicosService } from './gastos-medicos.service';

describe('GastosMedicosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GastosMedicosService]
    });
  });

  it('should be created', inject([GastosMedicosService], (service: GastosMedicosService) => {
    expect(service).toBeTruthy();
  }));
});
